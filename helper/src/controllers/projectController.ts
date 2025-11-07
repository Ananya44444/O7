import { Request, Response } from 'express';
import Project from '../models/Project';
import { generateProjectSummary } from '../services/openaiService';

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 12, category, tag, featured, search } = req.query;
    
    const query: any = {};
    
    // Add filters
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      projects,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get project by slug
export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create project (Admin only)
export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    
    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update project (Admin only)
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete project (Admin only)
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Generate AI summary for project
export const generateProjectAISummary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Generate AI summary using OpenAI
    const aiSummary = await generateProjectSummary(
      project.title,
      project.detailedDescription,
      project.technologies
    );
    
    // Update project with AI summary
    project.aiSummary = aiSummary;
    await project.save();

    res.json({
      success: true,
      message: 'AI summary generated successfully',
      summary: aiSummary
    });
  } catch (error) {
    console.error('Generate project summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI summary'
    });
  }
};

// Get project categories
export const getProjectCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Project.distinct('category');
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get project tags
export const getProjectTags = async (req: Request, res: Response) => {
  try {
    const tags = await Project.distinct('tags');
    
    res.json({
      success: true,
      tags: tags.flat()
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get project technologies
export const getProjectTechnologies = async (req: Request, res: Response) => {
  try {
    const technologies = await Project.distinct('technologies');
    
    res.json({
      success: true,
      technologies: technologies.flat()
    });
  } catch (error) {
    console.error('Get technologies error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};