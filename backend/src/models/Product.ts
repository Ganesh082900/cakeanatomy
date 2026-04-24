import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: mongoose.Types.ObjectId;
  recipe?: mongoose.Types.ObjectId;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  images: string[];
  stock: number;
  lowStockThreshold: number;
  sku: string;
  tags?: string[];
  isActive: boolean;
  isFeatured: boolean;
  isCustomizable: boolean;
  customizableOptions?: {
    flavors?: string[];
    sizes?: { name: string; price: number }[];
    addons?: { name: string; price: number }[];
  };
  rating?: number;
  reviewCount?: number;
  shelfLife?: number; // in hours for finished products
  productionTime?: number; // in minutes
  weight?: number; // in grams
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    costPrice: { type: Number },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 10 },
    sku: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isCustomizable: { type: Boolean, default: false },
    customizableOptions: {
      flavors: [{ type: String }],
      sizes: [
        {
          name: String,
          price: Number
        }
      ],
      addons: [
        {
          name: String,
          price: Number
        }
      ]
    },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    shelfLife: { type: Number },
    productionTime: { type: Number },
    weight: { type: Number },
    allergens: [{ type: String }],
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
