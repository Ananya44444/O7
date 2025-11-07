import { Request, Response } from 'express';
import Service from '../models/Service';
import { generateServiceDescription } from '../services/openaiService';

// Get all active services
export const getServices = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const query: any = { isActive: true };
    if (category) query.category = category;

    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get service by slug
export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const service = await Service.findOne({ slug, isActive: true });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create service (Admin only)
export const createService = async (req: Request, res: Response) => {
  try {
    const serviceData = req.body;
    
    // Generate AI description if not provided
    if (!serviceData.description && serviceData.title && serviceData.category) {
      try {
        serviceData.description = await generateServiceDescription(
          serviceData.title,
          serviceData.category
        );
      } catch (aiError) {
        console.error('AI description generation failed:', aiError);
        // Continue without AI description
      }
    }

    const service = new Service(serviceData);
    await service.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update service (Admin only)
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete service (Admin only)
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findByIdAndDelete(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get service categories
export const getServiceCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Service.distinct('category', { isActive: true });
    
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