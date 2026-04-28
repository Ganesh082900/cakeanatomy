import mongoose, { Document, Schema } from 'mongoose';

export interface IGiftCard extends Document {
  code: string;
  initialValue: number;
  currentValue: number;
  purchasedBy?: {
    name: string;
    email: string;
    phone: string;
  };
  recipientEmail?: string;
  recipientPhone?: string;
  message?: string;
  purchaseDate: Date;
  expiryDate: Date;
  status: 'active' | 'partially-used' | 'fully-used' | 'expired' | 'cancelled';
  transactions?: {
    date: Date;
    amount: number;
    orderId: mongoose.Types.ObjectId;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const GiftCardSchema = new Schema<IGiftCard>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    initialValue: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    purchasedBy: {
      name: String,
      email: String,
      phone: String
    },
    recipientEmail: { type: String },
    recipientPhone: { type: String },
    message: { type: String },
    purchaseDate: { type: Date, required: true, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'partially-used', 'fully-used', 'expired', 'cancelled'],
      default: 'active'
    },
    transactions: [
      {
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        orderId: { type: Schema.Types.ObjectId, ref: 'Order' }
      }
    ]
  },
  { timestamps: true }
);

// Update status before saving
GiftCardSchema.pre('save', function (next) {
  if (this.currentValue <= 0) {
    this.status = 'fully-used';
  } else if (this.currentValue < this.initialValue) {
    this.status = 'partially-used';
  } else if (this.expiryDate < new Date()) {
    this.status = 'expired';
  } else {
    this.status = 'active';
  }
  next();
});

export default mongoose.model<IGiftCard>('GiftCard', GiftCardSchema);
