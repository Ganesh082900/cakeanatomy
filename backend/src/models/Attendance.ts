import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
  staff: mongoose.Types.ObjectId;
  date: Date;
  clockIn: Date;
  clockOut?: Date;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  leaveType?: 'sick' | 'casual' | 'earned';
  notes?: string;
  hoursWorked?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    staff: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
    date: { type: Date, required: true },
    clockIn: { type: Date },
    clockOut: { type: Date },
    status: {
      type: String,
      required: true,
      enum: ['present', 'absent', 'half-day', 'leave'],
      default: 'present'
    },
    leaveType: {
      type: String,
      enum: ['sick', 'casual', 'earned']
    },
    notes: { type: String },
    hoursWorked: { type: Number }
  },
  { timestamps: true }
);

// Index for efficient queries
AttendanceSchema.index({ staff: 1, date: -1 });

// Calculate hours worked before saving
AttendanceSchema.pre('save', function (next) {
  if (this.clockIn && this.clockOut) {
    const diff = this.clockOut.getTime() - this.clockIn.getTime();
    this.hoursWorked = diff / (1000 * 60 * 60); // Convert to hours
  }
  next();
});

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
