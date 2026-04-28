import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import RawMaterial from '../models/RawMaterial';
import Staff from '../models/Staff';
import Attendance from '../models/Attendance';
import { startOfDay, endOfDay, subDays, startOfMonth, endOfMonth } from 'date-fns';

// GET /api/analytics/dashboard-overview
export const getDashboardOverview = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const startToday = startOfDay(today);
    const endToday = endOfDay(today);
    const startMonth = startOfMonth(today);
    const endMonth = endOfMonth(today);

    // Today's orders
    const todaysOrders = await Order.find({
      createdAt: { $gte: startToday, $lte: endToday }
    });

    // Monthly orders
    const monthlyOrders = await Order.find({
      createdAt: { $gte: startMonth, $lte: endMonth }
    });

    // Sales by source
    const salesBySource = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startToday, $lte: endToday },
          status: { $nin: ['cancelled'] }
        }
      },
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
          totalSales: { $sum: '$total' }
        }
      }
    ]);

    // Pending orders count
    const pendingOrders = await Order.countDocuments({
      status: { $in: ['pending', 'confirmed', 'in-production'] }
    });

    // Today's revenue
    const todaysRevenue = todaysOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0);

    // Monthly revenue
    const monthlyRevenue = monthlyOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0);

    // Low stock items
    const lowStockCount = await RawMaterial.countDocuments({
      status: { $in: ['low-stock', 'out-of-stock'] }
    });

    // Expiring items (within 7 days)
    const expiringItems = await RawMaterial.countDocuments({
      status: { $in: ['expiring-soon', 'expired'] }
    });

    // Staff present today
    const staffPresentToday = await Attendance.countDocuments({
      date: { $gte: startToday, $lte: endToday },
      status: 'present'
    });

    const totalStaff = await Staff.countDocuments({ isActive: true });

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('customer', 'name email phone')
      .select('orderNumber source total status createdAt');

    res.json({
      success: true,
      data: {
        overview: {
          todaysOrders: todaysOrders.length,
          todaysRevenue,
          monthlyRevenue,
          pendingOrders,
          salesBySource: salesBySource.map(s => ({
            source: s._id,
            count: s.count,
            revenue: s.totalSales
          }))
        },
        inventory: {
          lowStock: lowStockCount,
          expiring: expiringItems
        },
        staff: {
          present: staffPresentToday,
          total: totalStaff,
          attendanceRate: totalStaff > 0 ? ((staffPresentToday / totalStaff) * 100).toFixed(1) : 0
        },
        recentOrders
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/analytics/sales-by-source
export const getSalesBySource = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const matchStage: any = {
      status: { $nin: ['cancelled'] }
    };

    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }

    const salesBySource = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$source',
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          avgOrderValue: { $avg: '$total' }
        }
      },
      {
        $project: {
          source: '$_id',
          totalOrders: 1,
          totalRevenue: { $round: ['$totalRevenue', 2] },
          avgOrderValue: { $round: ['$avgOrderValue', 2] }
        }
      }
    ]);

    res.json({
      success: true,
      data: salesBySource
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/analytics/product-performance
export const getProductPerformance = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;

    const topProducts = await Order.aggregate([
      { $match: { status: { $nin: ['cancelled'] } } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          productName: { $first: '$items.name' },
          totalOrders: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: parseInt(limit as string) }
    ]);

    res.json({
      success: true,
      data: topProducts
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/analytics/inventory-status
export const getInventoryStatus = async (req: Request, res: Response) => {
  try {
    const materials = await RawMaterial.find()
      .select('name category currentStock minStockLevel status expiryDate totalValue')
      .sort({ status: 1, currentStock: 1 });

    const summary = {
      inStock: materials.filter(m => m.status === 'in-stock').length,
      lowStock: materials.filter(m => m.status === 'low-stock').length,
      outOfStock: materials.filter(m => m.status === 'out-of-stock').length,
      expiringSoon: materials.filter(m => m.status === 'expiring-soon').length,
      expired: materials.filter(m => m.status === 'expired').length,
      totalValue: materials.reduce((sum, m) => sum + m.totalValue, 0)
    };

    res.json({
      success: true,
      data: {
        summary,
        materials: materials.slice(0, 20) // Return top 20 for overview
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/analytics/staff-performance
export const getStaffPerformance = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    const targetDate = month && year 
      ? new Date(parseInt(year as string), parseInt(month as string) - 1)
      : new Date();
    
    const startDate = startOfMonth(targetDate);
    const endDate = endOfMonth(targetDate);

    const staffPerformance = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$staff',
          presentDays: {
            $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
          },
          totalHours: { $sum: '$hoursWorked' },
          leaveDays: {
            $sum: { $cond: [{ $eq: ['$status', 'leave'] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'staffs',
          localField: '_id',
          foreignField: '_id',
          as: 'staffDetails'
        }
      },
      { $unwind: '$staffDetails' },
      {
        $project: {
          staffName: '$staffDetails.name',
          role: '$staffDetails.role',
          department: '$staffDetails.department',
          presentDays: 1,
          totalHours: { $round: ['$totalHours', 2] },
          leaveDays: 1
        }
      },
      { $sort: { presentDays: -1 } }
    ]);

    res.json({
      success: true,
      data: staffPerformance
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/analytics/financial-report
export const getFinancialReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const matchStage: any = {
      status: { $nin: ['cancelled'] },
      paymentStatus: 'paid'
    };

    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }

    const orders = await Order.find(matchStage);

    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const taxes = orders.reduce((sum, o) => sum + o.tax, 0);
    const discounts = orders.reduce((sum, o) => sum + o.discount, 0);
    const deliveryFees = orders.reduce((sum, o) => sum + o.deliveryFee, 0);

    // Payment method breakdown
    const paymentBreakdown = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          total: { $sum: '$total' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        revenue,
        taxes,
        discounts,
        deliveryFees,
        netRevenue: revenue - discounts,
        orderCount: orders.length,
        avgOrderValue: orders.length > 0 ? revenue / orders.length : 0,
        paymentBreakdown
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
