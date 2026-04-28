import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  type: 'email' | 'sms' | 'whatsapp' | 'push';
  status: 'draft' | 'scheduled' | 'sent' | 'cancelled';
  eventTrigger?: 'birthday' | 'anniversary' | 'abandoned-cart' | 'welcome' | 'order-confirmation' | 'custom';
  subject?: string; // for email
  message: string;
  template?: string;
  targetAudience: {
    type: 'all' | 'segment' | 'individual';
    segment?: string; // 'loyal-customers', 'new-customers', 'inactive-customers'
    customerIds?: mongoose.Types.ObjectId[];
    filters?: {
      minOrderValue?: number;
      orderCount?: number;
      lastOrderDays?: number; // days since last order
    };
  };
  scheduledDate?: Date;
  sentDate?: Date;
  statistics?: {
    sent: number;
    delivered: number;
    opened?: number; // for email
    clicked?: number; // for email/sms
    failed: number;
  };
  attachments?: string[]; // URLs
  couponCode?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['email', 'sms', 'whatsapp', 'push']
    },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'scheduled', 'sent', 'cancelled'],
      default: 'draft'
    },
    eventTrigger: {
      type: String,
      enum: ['birthday', 'anniversary', 'abandoned-cart', 'welcome', 'order-confirmation', 'custom']
    },
    subject: { type: String },
    message: { type: String, required: true },
    template: { type: String },
    targetAudience: {
      type: {
        type: String,
        required: true,
        enum: ['all', 'segment', 'individual']
      },
      segment: { type: String },
      customerIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      filters: {
        minOrderValue: Number,
        orderCount: Number,
        lastOrderDays: Number
      }
    },
    scheduledDate: { type: Date },
    sentDate: { type: Date },
    statistics: {
      sent: { type: Number, default: 0 },
      delivered: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
      failed: { type: Number, default: 0 }
    },
    attachments: [{ type: String }],
    couponCode: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Staff', required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);
