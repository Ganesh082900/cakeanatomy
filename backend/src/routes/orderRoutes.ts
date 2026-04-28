import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  cancelOrder,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController';
import { protect, restrictTo } from '../middleware/auth';

const router = express.Router();

// User order routes
router.post('/', protect, createOrder);
router.get('/', protect, getMyOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/cancel', protect, cancelOrder);

// Admin order routes
router.get('/admin/all', protect, restrictTo('admin'), getAllOrders);
router.put('/:id/deliver', protect, restrictTo('admin'), updateOrderToDelivered);
router.put('/:id/status', protect, restrictTo('admin'), updateOrderStatus);

export default router;
