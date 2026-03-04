/**
 * API Service Layer
 * Centralized API calls with axios
 */

import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message || 'Something went wrong';
    
    // Show error toast
    toast.error(message);
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const projectAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const stackAPI = {
  getAll: (params) => api.get('/stacks', { params }),
  getById: (id) => api.get(`/stacks/${id}`),
  create: (data) => api.post('/stacks', data),
  update: (id, data) => api.put(`/stacks/${id}`, data),
  delete: (id) => api.delete(`/stacks/${id}`),
};

export const profileAPI = {
  get: () => api.get('/profile'),
  create: (data) => api.post('/profile', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/profile/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;
