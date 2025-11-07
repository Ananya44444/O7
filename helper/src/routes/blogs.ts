import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  generateBlogSummary,
  getAdminBlogs,
  getBlogCategories,
  getBlogTags
} from '../controllers/blogController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/categories', getBlogCategories);
router.get('/tags', getBlogTags);
router.get('/:slug', getBlogBySlug);

// Admin routes
router.get('/admin/list', authenticateToken, requireAdmin, getAdminBlogs);
router.post('/', authenticateToken, requireAdmin, createBlog);
router.put('/:id', authenticateToken, requireAdmin, updateBlog);
router.delete('/:id', authenticateToken, requireAdmin, deleteBlog);
router.post('/:id/ai-summary', authenticateToken, requireAdmin, generateBlogSummary);

export default router;