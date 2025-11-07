import mongoose, { Document, Schema } from 'mongoose';

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeFilePath: string;
  coverLetter?: string;
  linkedin?: string;
  portfolio?: string;
  atsScore: number; // ATS compatibility score (0-100)
  status: 'submitted' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema: Schema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  resumeFilePath: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String
  },
  linkedin: {
    type: String
  },
  portfolio: {
    type: String
  },
  atsScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'interview', 'rejected', 'hired'],
    default: 'submitted'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);