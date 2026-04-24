import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getOrdersBySource,
  getCancelledOrders,
  getCustomCakeOrders
} from '../controllers/orderController';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/source/:source', getOrdersBySource);
router.get('/cancelled', getCancelledOrders);
router.get('/custom-cakes', getCustomCakeOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/:id/status', updateOrderStatus);

export default router;
