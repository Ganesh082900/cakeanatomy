import express from 'express';
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
  getAllGiftCards,
  createGiftCard,
  validateGiftCard
} from '../controllers/couponController';

const router = express.Router();

// Coupons
router.get('/coupons', getAllCoupons);
router.get('/coupons/:id', getCouponById);
router.post('/coupons', createCoupon);
router.put('/coupons/:id', updateCoupon);
router.delete('/coupons/:id', deleteCoupon);
router.post('/coupons/validate', validateCoupon);

// Gift cards
router.get('/gift-cards', getAllGiftCards);
router.post('/gift-cards', createGiftCard);
router.post('/gift-cards/validate', validateGiftCard);

export default router;
