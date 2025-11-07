import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  icon: string;
  features: string[];
  price?: {
    amount: number;
    currency: string;
    period?: 'hour' | 'day' | 'month' | 'project';
  };
  category: string;
  isActive: boolean;
  order: number; // For sorting services
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 300
  },
  detailedDescription: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  price: {
    amount: {
      type: Number
    },
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hour', 'day', 'month', 'project']
    }
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from title before saving
ServiceSchema.pre<IService>('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

export default mongoose.model<IService>('Service', ServiceSchema);