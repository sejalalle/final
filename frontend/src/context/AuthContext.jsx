import React, { createContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from local storage or API on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Try to get user from API
        const res = await api.get('/api/auth/me');
        setUser(res.data.data);
      } catch (error) {
        // If not logged in, check local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await api.post('/api/auth/register', userData);
      
      setUser(res.data.data);
      
      if (userData.rememberMe) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
      }
      
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }}
}