// Example API Calls with Authentication
// File: src/services/apiService.ts

import AuthService from './authService';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Example: Get user's resumes (protected route)
export const getUserResumes = async () => {
  try {
    const response = await AuthService.authenticatedFetch(`${API_BASE}/resumes`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw error;
  }
};

// Example: Create a new job application (protected route)
export const applyToJob = async (jobId: string, resumeId: string) => {
  try {
    const response = await AuthService.authenticatedFetch(
      `${API_BASE}/applications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId, resumeId }),
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Error applying to job:', error);
    throw error;
  }
};

// Example: Update user profile (protected route)
export const updateUserProfile = async (profileData: {
  firstName: string;
  lastName: string;
}) => {
  try {
    const result = await AuthService.updateProfile(profileData);
    return result;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Example: Get jobs (public route - no auth needed)
export const getJobs = async (filters?: {
  department?: string;
  location?: string;
  type?: string;
}) => {
  try {
    const queryParams = filters ? new URLSearchParams(filters).toString() : '';
    const url = `${API_BASE}/jobs${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Example: Admin only route - get all users
export const getAllUsers = async () => {
  try {
    const response = await AuthService.authenticatedFetch(`${API_BASE}/admin/users`);
    
    if (!response.ok) {
      throw new Error('Unauthorized or forbidden');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default {
  getUserResumes,
  applyToJob,
  updateUserProfile,
  getJobs,
  getAllUsers,
};