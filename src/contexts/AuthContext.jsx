import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { username, password });
      
      if (response.data.success) {
        setCurrentUser(response.data.user);
        toast.success('Login successful');
        navigate('/admin');
        return { success: true };
      }
    } catch (error) {
      if (error.response && error.response.status === 409)if (error.response && error.response.status === 409) {
        // Session already active
        toast.info('Session is already active, redirecting to dashboard');
        setCurrentUser({ role: 'admin' }); // Set minimal user info to enable protected routes
        navigate('/admin');
        return { success: true, activeSession: true };
      } else {
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || 'Login failed');
        return { success: false };
      }
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setCurrentUser(null);
      toast.success('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };
  
  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/check-session');
      
      if (response.data.activeSession) {
        // Get user data
        const userResponse = await api.get('/auth/me');
        setCurrentUser(userResponse.data.user);
      }
    } catch (error) {
      // Session not active or expired
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const value = {
    currentUser,
    loading,
    login,
    logout,
    checkSession
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
