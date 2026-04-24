import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipeIngredient {
  material: mongoose.Types.ObjectId;
  quantity: number;
  unit: string;
}

export interface IRecipe extends Document {
  name: string;
  description?: string;
  category: string;
  ingredients: IRecipeIngredient[];
  instructions?: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  costPerUnit: number; // calculated from ingredients
  sellingPrice: number;
  profitMargin: number;
  isActive: boolean;
  images?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RecipeSchema = new Schema<IRecipe>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    category: { type: String, required: true },
    ingredients: [
      {
        material: { type: Schema.Types.ObjectId, ref: 'RawMaterial', required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true }
      }
    ],
    instructions: [{ type: String }],
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true, default: 1 },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    costPerUnit: { type: Number, default: 0 },
    sellingPrice: { type: Number, required: true },
    profitMargin: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    images: [{ type: String }],
    tags: [{ type: String }]
  },
  { timestamps: true }
);

// Calculate profit margin before saving
RecipeSchema.pre('save', function (next) {
  if (this.sellingPrice && this.costPerUnit) {
    this.profitMargin = ((this.sellingPrice - this.costPerUnit) / this.sellingPrice) * 100;
  }
  next();
});

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
