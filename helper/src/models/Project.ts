import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  images: string[];
  technologies: string[];
  tags: string[];
  client?: string;
  projectUrl?: string;
  repositoryUrl?: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: Date;
  endDate?: Date;
  category: string;
  featured: boolean;
  aiSummary?: string; // AI-generated project summary
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
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
  images: [{
    type: String
  }],
  technologies: [{
    type: String,
    required: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  client: {
    type: String,
    trim: true
  },
  projectUrl: {
    type: String
  },
  repositoryUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'planning'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  aiSummary: {
    type: String
  }
}, {
  timestamps: true
});

// Create slug from title before saving
ProjectSchema.pre<IProject>('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

export default mongoose.model<IProject>('Project', ProjectSchema);