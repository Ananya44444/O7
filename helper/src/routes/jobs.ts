import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  getJobApplications,
  updateApplicationStatus
} from '../controllers/jobController';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth';
import { uploadResume, handleUploadError } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Job application route (with resume upload)
router.post('/:jobId/apply', uploadResume, handleUploadError, applyForJob);

// Admin routes
router.post('/', authenticateToken, requireAdmin, createJob);
router.put('/:id', authenticateToken, requireAdmin, updateJob);
router.delete('/:id', authenticateToken, requireAdmin, deleteJob);
router.get('/:jobId/applications', authenticateToken, requireAdmin, getJobApplications);
router.put('/applications/:applicationId/status', authenticateToken, requireAdmin, updateApplicationStatus);

export default router;