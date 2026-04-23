import express from 'express';
import {
  getCart,
  getCartBySession,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  mergeCart
} from '../controllers/cartController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Session-based cart (guest users)
router.get('/session/:sessionId', getCartBySession);

// Authenticated cart routes
router.get('/', protect, getCart);
router.post('/items', protect, addToCart);
router.put('/items/:productId', protect, updateCartItem);
router.delete('/items/:productId', protect, removeFromCart);
router.delete('/', protect, clearCart);
router.post('/coupon', protect, applyCoupon);
router.post('/merge', protect, mergeCart);

export default router;
