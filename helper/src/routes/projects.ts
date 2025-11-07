import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  generateProjectAISummary,
  getProjectCategories,
  getProjectTags,
  getProjectTechnologies
} from '../controllers/projectController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { uploadProjectImages, handleUploadError } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/categories', getProjectCategories);
router.get('/tags', getProjectTags);
router.get('/technologies', getProjectTechnologies);
router.get('/:slug', getProjectBySlug);

// Admin routes
router.post('/', authenticateToken, requireAdmin, uploadProjectImages, handleUploadError, createProject);
router.put('/:id', authenticateToken, requireAdmin, uploadProjectImages, handleUploadError, updateProject);
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);
router.post('/:id/ai-summary', authenticateToken, requireAdmin, generateProjectAISummary);

export default router;