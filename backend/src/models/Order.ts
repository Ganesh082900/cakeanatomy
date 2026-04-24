import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  customization?: {
    flavor?: string;
    size?: string;
    message?: string;
    designImage?: string;
  };
}

export interface IOrder extends Document {
  orderNumber: string;
  source: 'platform' | 'swiggy' | 'zomato' | 'in-store' | 'phone' | 'whatsapp';
  sourceOrderId?: string; // For Swiggy/Zomato order IDs
  customer: mongoose.Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  giftCardCode?: string;
  total: number;
  status: 'pending' | 'confirmed' | 'in-production' | 'ready' | 'out-for-delivery' | 'delivered' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'cash' | 'card' | 'upi' | 'online' | 'gift-card';
  transactionId?: string;
  orderType: 'delivery' | 'pickup' | 'dine-in';
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    landmark?: string;
  };
  deliveryTime?: Date;
  assignedDeliveryStaff?: mongoose.Types.ObjectId;
  scheduledPickupTime?: Date;
  customerNotes?: string;
  internalNotes?: string;
  statusHistory?: {
    status: string;
    timestamp: Date;
    updatedBy?: mongoose.Types.ObjectId;
  }[];
  isCustomCake: boolean;
  customCakeDetails?: {
    consultationDate?: Date;
    designApproved: boolean;
    advancePayment?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    source: {
      type: String,
      required: true,
      enum: ['platform', 'swiggy', 'zomato', 'in-store', 'phone', 'whatsapp']
    },
    sourceOrderId: { type: String },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        customization: {
          flavor: String,
          size: String,
          message: String,
          designImage: String
        }
      }
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    couponCode: { type: String },
    giftCardCode: { type: String },
    total: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'in-production', 'ready', 'out-for-delivery', 'delivered', 'completed', 'cancelled'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['cash', 'card', 'upi', 'online', 'gift-card']
    },
    transactionId: { type: String },
    orderType: {
      type: String,
      required: true,
      enum: ['delivery', 'pickup', 'dine-in']
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      landmark: String
    },
    deliveryTime: { type: Date },
    assignedDeliveryStaff: { type: Schema.Types.ObjectId, ref: 'Staff' },
    scheduledPickupTime: { type: Date },
    customerNotes: { type: String },
    internalNotes: { type: String },
    statusHistory: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        updatedBy: { type: Schema.Types.ObjectId, ref: 'Staff' }
      }
    ],
    isCustomCake: { type: Boolean, default: false },
    customCakeDetails: {
      consultationDate: Date,
      designApproved: { type: Boolean, default: false },
      advancePayment: Number
    }
  },
  { timestamps: true }
);

// Generate order number before saving
OrderSchema.pre('save', async function (next) {
  if (this.isNew && !this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    const date = new Date();
    const prefix = this.source.substring(0, 2).toUpperCase();
    this.orderNumber = `${prefix}${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(count + 1).padStart(5, '0')}`;
  }
  
  // Add to status history if status changed
  if (this.isModified('status')) {
    if (!this.statusHistory) {
      this.statusHistory = [];
    }
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      updatedBy: undefined
    });
  }
  
  next();
});

export default mongoose.model<IOrder>('Order', OrderSchema);
