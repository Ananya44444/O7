// Authentication Hook Example
// File: src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/authService';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      if (AuthService.isAuthenticated()) {
        const userData = AuthService.getCurrentUser();
        setAuthState({
          user: userData,
          loading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState({
        user: null,
        loading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const result = await AuthService.login(credentials);
      if (result.success) {
        setAuthState({
          user: result.user!,
          loading: false,
          isAuthenticated: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const result = await AuthService.register(userData);
      if (result.success) {
        setAuthState({
          user: result.user!,
          loading: false,
          isAuthenticated: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    AuthService.logout();
    setAuthState({
      user: null,
      loading: false,
      isAuthenticated: false,
    });
    router.push('/');
  };

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuthState,
  };
};

export default useAuth;