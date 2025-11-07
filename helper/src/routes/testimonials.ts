import express from 'express';
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getTestimonials);

// Admin routes
router.get('/:id', authenticateToken, requireAdmin, getTestimonialById);
router.post('/', authenticateToken, requireAdmin, createTestimonial);
router.put('/:id', authenticateToken, requireAdmin, updateTestimonial);
router.delete('/:id', authenticateToken, requireAdmin, deleteTestimonial);

export default router;