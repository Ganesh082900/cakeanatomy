import { Request, Response } from 'express';
import Order from '../models/Order';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, status, source } = req.query;
    const query: any = {};
    
    if (status) query.status = status;
    if (source) query.source = source;

    const orders = await Order.find(query)
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer')
      .populate('items.product')
      .populate('assignedDeliveryStaff', 'name phone');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getOrdersBySource = async (req: Request, res: Response) => {
  try {
    const { source } = req.params;
    const orders = await Order.find({ source })
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, data: orders, count: orders.length });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCancelledOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ status: 'cancelled' })
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, data: orders, count: orders.length });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomCakeOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ isCustomCake: true })
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
