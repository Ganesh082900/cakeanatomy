import mongoose, { Document, Schema } from 'mongoose';

export interface IStaff extends Document {
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'baker' | 'cashier' | 'delivery';
  department: 'production' | 'sales' | 'delivery' | 'management';
  employeeId: string;
  dateOfJoining: Date;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  salary?: number;
  isActive: boolean;
  profileImage?: string;
  permissions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const StaffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'manager', 'baker', 'cashier', 'delivery'],
      default: 'cashier'
    },
    department: {
      type: String,
      required: true,
      enum: ['production', 'sales', 'delivery', 'management']
    },
    employeeId: { type: String, required: true, unique: true },
    dateOfJoining: { type: Date, required: true },
    dateOfBirth: { type: Date },
    address: { type: String },
    emergencyContact: {
      name: String,
      phone: String,
      relation: String
    },
    salary: { type: Number },
    isActive: { type: Boolean, default: true },
    profileImage: { type: String },
    permissions: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model<IStaff>('Staff', StaffSchema);
