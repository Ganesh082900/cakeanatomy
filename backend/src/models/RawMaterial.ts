import mongoose, { Document, Schema } from 'mongoose';

export interface IRawMaterial extends Document {
  name: string;
  category: 'flour' | 'dairy' | 'sweetener' | 'flavoring' | 'decoration' | 'packaging' | 'other';
  unit: 'kg' | 'g' | 'L' | 'ml' | 'pieces' | 'dozen';
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  unitPrice: number; // price per unit
  supplier?: mongoose.Types.ObjectId;
  expiryDate?: Date;
  batchNumber?: string;
  storageLocation?: string;
  isPerishable: boolean;
  shelfLife?: number; // in days
  lastRestockDate?: Date;
  totalValue: number; // calculated: currentStock * unitPrice
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expiring-soon' | 'expired';
  createdAt: Date;
  updatedAt: Date;
}

const RawMaterialSchema = new Schema<IRawMaterial>(
  {
    name: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ['flour', 'dairy', 'sweetener', 'flavoring', 'decoration', 'packaging', 'other']
    },
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'g', 'L', 'ml', 'pieces', 'dozen']
    },
    currentStock: { type: Number, required: true, default: 0 },
    minStockLevel: { type: Number, required: true, default: 10 },
    maxStockLevel: { type: Number, required: true, default: 100 },
    unitPrice: { type: Number, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    expiryDate: { type: Date },
    batchNumber: { type: String },
    storageLocation: { type: String },
    isPerishable: { type: Boolean, default: false },
    shelfLife: { type: Number }, // days
    lastRestockDate: { type: Date },
    totalValue: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['in-stock', 'low-stock', 'out-of-stock', 'expiring-soon', 'expired'],
      default: 'in-stock'
    }
  },
  { timestamps: true }
);

// Calculate total value and status before saving
RawMaterialSchema.pre('save', function (next) {
  this.totalValue = this.currentStock * this.unitPrice;
  
  // Update status based on stock level
  if (this.currentStock <= 0) {
    this.status = 'out-of-stock';
  } else if (this.currentStock <= this.minStockLevel) {
    this.status = 'low-stock';
  } else if (this.expiryDate) {
    const daysToExpiry = Math.ceil((this.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysToExpiry <= 0) {
      this.status = 'expired';
    } else if (daysToExpiry <= 7) {
      this.status = 'expiring-soon';
    } else {
      this.status = 'in-stock';
    }
  } else {
    this.status = 'in-stock';
  }
  
  next();
});

export default mongoose.model<IRawMaterial>('RawMaterial', RawMaterialSchema);
