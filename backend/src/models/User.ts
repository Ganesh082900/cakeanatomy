import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'customer' | 'admin';
  dateOfBirth?: Date;
  anniversary?: Date;
  addresses?: {
    type: 'home' | 'work' | 'other';
    street: string;
    city: string;
    state: string;
    zipCode: string;
    landmark?: string;
    isDefault: boolean;
  }[];
  loyaltyPoints: number;
  preferences?: {
    favoriteProducts?: mongoose.Types.ObjectId[];
    allergies?: string[];
    dietaryRestrictions?: string[];
  };
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    },
    dateOfBirth: { type: Date },
    anniversary: { type: Date },
    addresses: [
      {
        type: {
          type: String,
          enum: ['home', 'work', 'other'],
          default: 'home'
        },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        landmark: String,
        isDefault: { type: Boolean, default: false }
      }
    ],
    loyaltyPoints: { type: Number, default: 0 },
    preferences: {
      favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      allergies: [{ type: String }],
      dietaryRestrictions: [{ type: String }]
    },
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    lastOrderDate: { type: Date }
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
