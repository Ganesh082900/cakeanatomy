import mongoose, { Document, Schema } from 'mongoose';

export interface IProduction extends Document {
  recipe: mongoose.Types.ObjectId;
  batchNumber: string;
  quantity: number;
  scheduledDate: Date;
  startTime?: Date;
  endTime?: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: mongoose.Types.ObjectId; // Staff ID
  actualQuantityProduced?: number;
  wastage?: number;
  wastageReason?: string;
  qualityCheck?: {
    passed: boolean;
    checkedBy: mongoose.Types.ObjectId;
    notes?: string;
    checkDate: Date;
  };
  cost: {
    materialCost: number;
    laborCost?: number;
    overheadCost?: number;
    totalCost: number;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductionSchema = new Schema<IProduction>(
  {
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    batchNumber: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    scheduledDate: { type: Date, required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'Staff' },
    actualQuantityProduced: { type: Number },
    wastage: { type: Number, default: 0 },
    wastageReason: { type: String },
    qualityCheck: {
      passed: { type: Boolean },
      checkedBy: { type: Schema.Types.ObjectId, ref: 'Staff' },
      notes: { type: String },
      checkDate: { type: Date }
    },
    cost: {
      materialCost: { type: Number, required: true },
      laborCost: { type: Number },
      overheadCost: { type: Number },
      totalCost: { type: Number, required: true }
    },
    notes: { type: String }
  },
  { timestamps: true }
);

// Generate batch number before saving
ProductionSchema.pre('save', async function (next) {
  if (this.isNew && !this.batchNumber) {
    const count = await mongoose.model('Production').countDocuments();
    const date = new Date();
    this.batchNumber = `BATCH-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

export default mongoose.model<IProduction>('Production', ProductionSchema);
