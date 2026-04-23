import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },
    title: {
      type: String,
      maxlength: 100
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      maxlength: 1000
    },
    images: [String],
    isVerifiedPurchase: {
      type: Boolean,
      default: false
    },
    helpfulCount: {
      type: Number,
      default: 0
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Ensure one review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', reviewSchema);
