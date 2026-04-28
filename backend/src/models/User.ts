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
  password: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  addresses: Array<{
    _id?: string;
    label: string;
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
    country: string;
    isDefault: boolean;
  }>;
  isEmailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
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
const addressSchema = new Schema({
  label: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: 'India' },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false
    },
    phone: {
      type: String,
      match: [/^\+?[\d\s-()]+$/, 'Please provide a valid phone number']
    },
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
    avatar: String,
    addresses: [addressSchema],
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Ensure only one default address
userSchema.pre('save', function (next) {
  if (this.addresses && this.addresses.length > 0) {
    const defaultAddresses = this.addresses.filter(addr => addr.isDefault);
    if (defaultAddresses.length > 1) {
      // Keep only the first default, set others to false
      let foundFirst = false;
      this.addresses.forEach(addr => {
        if (addr.isDefault && !foundFirst) {
          foundFirst = true;
        } else if (addr.isDefault) {
          addr.isDefault = false;
        }
      });
    }
  }
  next();
});

export default mongoose.model<IUser>('User', userSchema);
