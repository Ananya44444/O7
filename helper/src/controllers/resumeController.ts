import { Request, Response } from 'express';
import Resume from '../models/Resume';
import { calculateATSScore } from '../utils/atsUtils';

// Create resume
export const createResume = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const resumeData = { ...req.body };
    
    if (userId) {
      resumeData.userId = userId;
    }

    // Calculate ATS score based on resume content
    resumeData.atsScore = calculateATSScore(resumeData);

    const resume = new Resume(resumeData);
    await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      resume
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get resume by ID
export const getResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    const resume = await Resume.findById(id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Check if user owns this resume or if resume is public
    if (resume.userId && resume.userId.toString() !== userId && !resume.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      resume
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update resume
export const updateResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;
    const updateData = { ...req.body };

    // Recalculate ATS score
    updateData.atsScore = calculateATSScore(updateData);

    const resume = await Resume.findById(id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Check if user owns this resume
    if (resume.userId && resume.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Resume updated successfully',
      resume: updatedResume
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user's resumes
export const getUserResumes = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { page = 1, limit = 10 } = req.query;

    const resumes = await Resume.find({ userId })
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Resume.countDocuments({ userId });

    res.json({
      success: true,
      resumes,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get user resumes error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete resume
export const deleteResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.userId;

    const resume = await Resume.findById(id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Check if user owns this resume
    if (resume.userId && resume.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Resume.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get resume templates
export const getResumeTemplates = async (req: Request, res: Response) => {
  try {
    const templates = [
      {
        id: 'modern',
        name: 'Modern',
        description: 'Clean and contemporary design',
        preview: '/templates/modern-preview.jpg'
      },
      {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional and professional',
        preview: '/templates/classic-preview.jpg'
      },
      {
        id: 'creative',
        name: 'Creative',
        description: 'Unique and artistic layout',
        preview: '/templates/creative-preview.jpg'
      },
      {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple and elegant',
        preview: '/templates/minimal-preview.jpg'
      }
    ];

    res.json({
      success: true,
      templates
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};