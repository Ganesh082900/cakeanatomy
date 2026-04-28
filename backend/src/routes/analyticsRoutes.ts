import express from 'express';
import {
  getDashboardOverview,
  getSalesBySource,
  getProductPerformance,
  getInventoryStatus,
  getStaffPerformance,
  getFinancialReport
} from '../controllers/analyticsController';

const router = express.Router();

// Dashboard overview with all key metrics
router.get('/dashboard-overview', getDashboardOverview);

// Sales analytics by source (Swiggy, Zomato, Platform, etc.)
router.get('/sales-by-source', getSalesBySource);

// Product performance analytics
router.get('/product-performance', getProductPerformance);

// Inventory status and alerts
router.get('/inventory-status', getInventoryStatus);

// Staff performance metrics
router.get('/staff-performance', getStaffPerformance);

// Financial reports
router.get('/financial-report', getFinancialReport);

export default router;
