import express from 'express';
import {
  submitContactForm,
  getContactSubmissions,
  getContactById,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/', submitContactForm);

// Admin routes
router.get('/', authenticateToken, requireAdmin, getContactSubmissions);
router.get('/:id', authenticateToken, requireAdmin, getContactById);
router.put('/:id/status', authenticateToken, requireAdmin, updateContactStatus);
router.delete('/:id', authenticateToken, requireAdmin, deleteContact);

export default router;