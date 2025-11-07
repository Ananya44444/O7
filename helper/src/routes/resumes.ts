import express from 'express';
import {
  createResume,
  getResume,
  updateResume,
  getUserResumes,
  deleteResume,
  getResumeTemplates
} from '../controllers/resumeController';
import { authenticateToken, optionalAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/templates', getResumeTemplates);

// Routes that work with or without authentication
router.post('/', optionalAuth, createResume);
router.get('/:id', optionalAuth, getResume);

// Protected routes
router.get('/user/list', authenticateToken, getUserResumes);
router.put('/:id', authenticateToken, updateResume);
router.delete('/:id', authenticateToken, deleteResume);

export default router;