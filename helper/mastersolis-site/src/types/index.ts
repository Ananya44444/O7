// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Job types
export interface Job {
  _id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  isActive: boolean;
  postedBy: User;
  createdAt: string;
  updatedAt: string;
}

// Job Application types
export interface JobApplication {
  _id: string;
  jobId: Job;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeFilePath: string;
  coverLetter?: string;
  linkedin?: string;
  portfolio?: string;
  atsScore: number;
  status: 'submitted' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Resume types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  honors?: string[];
}

export interface Skills {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface Resume {
  _id?: string;
  userId?: string;
  template: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skills[];
  certifications: Certification[];
  projects: Project[];
  atsScore: number;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}

// Blog types
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  tags: string[];
  category: string;
  author: User;
  status: 'draft' | 'published';
  publishedAt?: string;
  aiSummary?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Service types
export interface Service {
  _id: string;
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
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Project types (Portfolio)
export interface PortfolioProject {
  _id: string;
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
  startDate: string;
  endDate?: string;
  category: string;
  featured: boolean;
  aiSummary?: string;
  createdAt: string;
  updatedAt: string;
}

// Testimonial types
export interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Contact types
export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'responded' | 'closed';
  aiReply?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationResponse<T = any> {
  success: boolean;
  data?: T[];
  pagination?: {
    current: number;
    pages: number;
    total: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface JobApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  linkedin?: string;
  portfolio?: string;
  resume: File | null;
}