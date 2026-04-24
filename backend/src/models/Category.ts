import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parent?: mongoose.Types.ObjectId;
  image?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>('Category', CategorySchema);
