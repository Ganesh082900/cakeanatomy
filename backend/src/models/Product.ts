import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: mongoose.Types.ObjectId;
  type: 'pastry' | 'confection' | 'bakery' | 'cake';
  images: string[];
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  weight?: number;
  weightUnit?: 'g' | 'kg' | 'lb';
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: 'cm' | 'inch';
  };
  stock: number;
  sku?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string[];
  allergens: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
  };
  ingredients?: string[];
  variants?: Array<{
    name: string;
    options: Array<{
      value: string;
      priceModifier: number;
    }>;
  }>;
  rating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    shortDescription: {
      type: String,
      maxlength: 200
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required']
    },
    type: {
      type: String,
      enum: ['pastry', 'confection', 'bakery', 'cake'],
      required: [true, 'Product type is required']
    },
    images: {
      type: [String],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one product image is required'
      }
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare at price cannot be negative']
    },
    costPrice: {
      type: Number,
      min: [0, 'Cost price cannot be negative']
    },
    weight: Number,
    weightUnit: {
      type: String,
      enum: ['g', 'kg', 'lb'],
      default: 'g'
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ['cm', 'inch'],
        default: 'cm'
      }
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    tags: [String],
    allergens: [String],
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbohydrates: Number,
      fat: Number,
      fiber: Number,
      sugar: Number
    },
    ingredients: [String],
    variants: [{
      name: String,
      options: [{
        value: String,
        priceModifier: { type: Number, default: 0 }
      }]
    }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Generate slug from name before saving
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Update isAvailable based on stock
productSchema.pre('save', function (next) {
  if (this.stock === 0) {
    this.isAvailable = false;
  }
  next();
});

export default mongoose.model<IProduct>('Product', productSchema);
