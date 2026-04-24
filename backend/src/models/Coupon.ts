import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscountAmount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  applicableCategories?: string[];
  applicableProducts?: mongoose.Types.ObjectId[];
  excludedProducts?: mongoose.Types.ObjectId[];
  userRestrictions?: {
    firstOrderOnly?: boolean;
    userLimit?: number; // per user
  };
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, required: true },
    discountType: {
      type: String,
      required: true,
      enum: ['percentage', 'fixed']
    },
    discountValue: { type: Number, required: true },
    minOrderValue: { type: Number },
    maxDiscountAmount: { type: Number },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    usageLimit: { type: Number },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    applicableCategories: [{ type: String }],
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    excludedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    userRestrictions: {
      firstOrderOnly: { type: Boolean, default: false },
      userLimit: { type: Number }
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Staff', required: true }
  },
  { timestamps: true }
);

// Validate discount value
CouponSchema.pre('save', function (next) {
  if (this.discountType === 'percentage' && this.discountValue > 100) {
    throw new Error('Percentage discount cannot exceed 100%');
  }
  next();
});

export default mongoose.model<ICoupon>('Coupon', CouponSchema);
