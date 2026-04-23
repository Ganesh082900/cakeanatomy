import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  selectedVariants?: Array<{
    name: string;
    value: string;
    priceModifier: number;
  }>;
  subtotal: number;
}

export interface ICart extends Document {
  user?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: ICartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  couponCode?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  calculateTotals(): void;
}

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  selectedVariants: [{
    name: String,
    value: String,
    priceModifier: { type: Number, default: 0 }
  }],
  subtotal: {
    type: Number,
    required: true,
    default: 0
  }
});

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      sparse: true
    },
    sessionId: {
      type: String,
      sparse: true
    },
    items: [cartItemSchema],
    totalItems: {
      type: Number,
      default: 0
    },
    subtotal: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    couponCode: String,
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  },
  {
    timestamps: true
  }
);

// Calculate item subtotal before saving
cartItemSchema.pre('save', function (next) {
  let itemPrice = this.price;
  
  // Add variant price modifiers
  if (this.selectedVariants && this.selectedVariants.length > 0) {
    this.selectedVariants.forEach(variant => {
      itemPrice += variant.priceModifier || 0;
    });
  }
  
  this.subtotal = itemPrice * this.quantity;
  next();
});

// Calculate cart totals method
cartSchema.methods.calculateTotals = function () {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  this.tax = this.subtotal * 0.18; // 18% GST
  this.total = this.subtotal + this.tax - this.discount;
};

// Calculate totals before saving
cartSchema.pre('save', function (next) {
  this.calculateTotals();
  next();
});

// Ensure either user or sessionId is present
cartSchema.index({ user: 1 }, { sparse: true });
cartSchema.index({ sessionId: 1 }, { sparse: true });
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ICart>('Cart', cartSchema);
