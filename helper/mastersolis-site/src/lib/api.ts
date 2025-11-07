import axios from 'axios';
import { ApiResponse, PaginationResponse } from '@/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token on unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Helper function to handle API responses
export const handleApiResponse = <T>(
  response: any
): ApiResponse<T> => {
  return {
    success: response.data.success || true,
    message: response.data.message,
    data: response.data.data || response.data,
  };
};

// Helper function to handle paginated API responses
export const handlePaginatedResponse = <T>(
  response: any
): PaginationResponse<T> => {
  return {
    success: response.data.success || true,
    data: response.data.data || response.data.results || response.data,
    pagination: response.data.pagination,
  };
};