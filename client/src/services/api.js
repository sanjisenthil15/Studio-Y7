import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile')
};

export const galleryAPI = {
  getAll: () => api.get('/gallery'),
  upload: (formData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
  reorder: (data) => api.put('/gallery/reorder/all', data)
};

export const heroAPI = {
  get: () => api.get('/hero'),
  upload: (formData) => api.post('/hero', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/hero/${id}`)
};

export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getAll: () => api.get('/bookings'),
  getNewCount: () => api.get('/bookings/new/count'),
  markAsViewed: () => api.put('/bookings/new/mark-viewed'),
  updateStatus: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
  createPayment: (data) => api.post('/bookings/payment/create', data),
  verifyPayment: (data) => api.post('/bookings/payment/verify', data)
};

export const contactAPI = {
  create: (data) => api.post('/contacts', data),
  getAll: () => api.get('/contacts'),
  updateStatus: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`)
};

export const testimonialAPI = {
  getAll: () => api.get('/testimonials'),
  create: (formData) => api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

export const pricingAPI = {
  getAll: () => api.get('/pricing'),
  create: (data) => api.post('/pricing', data),
  update: (id, data) => api.put(`/pricing/${id}`, data),
  delete: (id) => api.delete(`/pricing/${id}`)
};

export const contentAPI = {
  getAll: () => api.get('/content'),
  get: (section) => api.get(`/content/${section}`),
  update: (section, data) => api.put(`/content/${section}`, data)
};

export default api;
