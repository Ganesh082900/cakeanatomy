import { Request, Response } from 'express';
import Coupon from '../models/Coupon';
import GiftCard from '../models/GiftCard';

// Coupons
export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const query = isActive !== undefined ? { isActive: isActive === 'true' } : {};
    
    const coupons = await Coupon.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: coupons });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCouponById = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findById(req.params.id).populate('createdBy', 'name');
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    res.json({ success: true, data: coupon });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    
    res.json({ success: true, data: coupon });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    
    res.json({ success: true, message: 'Coupon deactivated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code, orderValue } = req.body;
    
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon' });
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
    }

    if (coupon.minOrderValue && orderValue < coupon.minOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value of ₹${coupon.minOrderValue} required`
      });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (orderValue * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount) {
        discount = Math.min(discount, coupon.maxDiscountAmount);
      }
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      success: true,
      data: {
        coupon,
        discountAmount: discount,
        finalAmount: orderValue - discount
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Gift Cards
export const getAllGiftCards = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    
    const giftCards = await GiftCard.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: giftCards });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGiftCard = async (req: Request, res: Response) => {
  try {
    // Generate unique code
    const code = 'GC' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const giftCard = await GiftCard.create({
      ...req.body,
      code,
      currentValue: req.body.initialValue
    });
    
    res.status(201).json({ success: true, data: giftCard });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const validateGiftCard = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    
    const giftCard = await GiftCard.findOne({
      code: code.toUpperCase(),
      status: { $in: ['active', 'partially-used'] },
      expiryDate: { $gte: new Date() }
    });

    if (!giftCard) {
      return res.status(404).json({ success: false, message: 'Invalid or expired gift card' });
    }

    res.json({
      success: true,
      data: {
        code: giftCard.code,
        currentValue: giftCard.currentValue,
        expiryDate: giftCard.expiryDate
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
