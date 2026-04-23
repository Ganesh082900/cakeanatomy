import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  image: string;
  quantity: number;
  price: number;
  selectedVariants?: Array<{
    name: string;
    value: string;
    priceModifier: number;
  }>;
  subtotal: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod' | 'wallet';
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentResult?: {
    id: string;
    status: string;
    updateTime: Date;
    emailAddress?: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  discount: number;
  totalPrice: number;
  couponCode?: string;
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  selectedVariants: [{
    name: String,
    value: String,
    priceModifier: Number
  }],
  subtotal: {
    type: Number,
    required: true
  }
});

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: 'India' },
  phone: String
});

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: function(v: IOrderItem[]) {
          return v && v.length > 0;
        },
        message: 'Order must have at least one item'
      }
    },
    shippingAddress: {
      type: addressSchema,
      required: true
    },
    billingAddress: addressSchema,
    paymentMethod: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'cod', 'wallet'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentResult: {
      id: String,
      status: String,
      updateTime: Date,
      emailAddress: String
    },
    itemsPrice: {
      type: Number,
      required: true,
      min: 0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    couponCode: String,
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: Date,
    cancelledAt: Date,
    cancellationReason: String,
    notes: String,
    trackingNumber: String,
    estimatedDelivery: Date
  },
  {
    timestamps: true
  }
);

// Generate unique order number
orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

// Update payment status when order is paid
orderSchema.pre('save', function (next) {
  if (this.isModified('isPaid') && this.isPaid && !this.paidAt) {
    this.paidAt = new Date();
    this.paymentStatus = 'completed';
  }
  next();
});

// Update delivery status
orderSchema.pre('save', function (next) {
  if (this.isModified('isDelivered') && this.isDelivered && !this.deliveredAt) {
    this.deliveredAt = new Date();
    this.orderStatus = 'delivered';
  }
  next();
});

export default mongoose.model<IOrder>('Order', orderSchema);
