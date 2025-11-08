'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { handleApiResponse } from '@/lib/api';
import { User, LoginForm, RegisterForm } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginForm) => Promise<boolean>;
  register: (userData: RegisterForm) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize auth state from localStorage only on client side
  useEffect(() => {
    const initAuth = () => {
      // Mark as hydrated to prevent SSR/client mismatch
      setIsHydrated(true);
      
      console.log('Initializing auth state...');
      
      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        
        console.log('Token exists:', !!token);
        console.log('Stored user exists:', !!storedUser);
        
        if (token && storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            console.log('Restoring user from localStorage:', userData.firstName);
            setUser(userData);
            // Don't verify token on every page load - trust localStorage for better UX
            // Only verify if there are authentication issues
          } catch (error) {
            console.error('Error parsing stored user data:', error);
            logout();
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      const result = handleApiResponse<User>(response);
      if (result.success && result.data) {
        setUser(result.data);
        localStorage.setItem('user', JSON.stringify(result.data));
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    }
  };

  const login = async (credentials: LoginForm): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('Attempting login with:', { email: credentials.email });
      
      const response = await api.post('/auth/login', credentials);
      console.log('Login response received:', response.status);
      
      const result = handleApiResponse<{ token: string; user: User }>(response);
      console.log('Login result:', result);
      
      if (result.success && result.data) {
        const { token, user } = result.data;
        
        console.log('Login successful, storing data for user:', user.firstName);
        
        // Store token and user data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setUser(user);
        return true;
      }
      console.log('Login failed: no data in response');
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Login error response:', error.response.data);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterForm): Promise<{ success: boolean; message?: string }> => {
    try {
      setLoading(true);
      const { confirmPassword, ...registerData } = userData;
      
      console.log('Attempting registration with data:', registerData);
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL || '/api');
      
      const response = await api.post('/auth/register', registerData);
      console.log('Registration response:', response);
      
      const result = handleApiResponse<{ token: string; user: User }>(response);
      
      if (result.success && result.data) {
        const { token, user } = result.data;
        
        // Store token and user data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setUser(user);
        return { success: true };
      }
      return { success: false, message: result.message || 'Registration failed' };
    } catch (error: any) {
      console.error('Registration error details:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        
        // Get the actual error message from server
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
          console.error('Server error message:', errorMessage);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        errorMessage = 'Network error. Please check your connection.';
      } else {
        console.error('Request setup error:', error.message);
        errorMessage = 'Request setup error.';
      }
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user...');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};