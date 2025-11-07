import { Request, Response } from 'express';
import Job from '../models/Job';
import JobApplication from '../models/JobApplication';

// Get all active jobs
export const getJobs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, type, level, location } = req.query;
    
    const query: any = { isActive: true };
    
    // Add filters
    if (type) query.type = type;
    if (level) query.level = level;
    if (location) query.location = new RegExp(location as string, 'i');

    const jobs = await Job.find(query)
      .populate('postedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      jobs,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get job by ID
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findById(id)
      .populate('postedBy', 'firstName lastName');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      job
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new job (Admin only)
export const createJob = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const jobData = { ...req.body, postedBy: userId };
    
    const job = new Job(jobData);
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update job (Admin only)
export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete job (Admin only)
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const job = await Job.findByIdAndDelete(id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Apply for job
export const applyForJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const applicationData = { ...req.body, jobId };
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or inactive'
      });
    }

    // Check if user already applied
    const existingApplication = await JobApplication.findOne({
      jobId,
      email: applicationData.email
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    const application = new JobApplication(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Job application error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get applications for a job (Admin only)
export const getJobApplications = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    
    const query: any = { jobId };
    if (status) query.status = status;

    const applications = await JobApplication.find(query)
      .populate('jobId', 'title company')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await JobApplication.countDocuments(query);

    res.json({
      success: true,
      applications,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update application status (Admin only)
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    const { status, notes } = req.body;

    const application = await JobApplication.findByIdAndUpdate(
      applicationId,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};