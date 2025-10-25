import api from './api';

const authService = {
  // User Authentication
  userRegister: async (data) => {
    const response = await api.post('/user/register', data);
    return response.data;
  },

  userVerifyOtp: async (data) => {
    const response = await api.post('/user/verify-otp', data);
    return response.data;
  },

  userLogin: async (data) => {
    const response = await api.post('/user/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        username: response.data.username,
        role: 'USER'
      }));
    }
    return response.data;
  },

  userForgotPassword: async (data) => {
    const response = await api.post('/user/forgot-password', data);
    return response.data;
  },

  userVerifyResetOtp: async (data) => {
    const response = await api.post('/user/verify-reset-otp', data);
    return response.data;
  },

  userResetPassword: async (data) => {
    const response = await api.post('/user/reset-password', data);
    return response.data;
  },

  getUserProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Admin Authentication
  adminRegister: async (data) => {
    const response = await api.post('/admin/register', data);
    return response.data;
  },

  adminLogin: async (data) => {
    const response = await api.post('/admin/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        username: response.data.username,
        role: 'ADMIN'
      }));
    }
    return response.data;
  },

  adminForgotPassword: async (data) => {
    const response = await api.post('/admin/forgot-password', data);
    return response.data;
  },

  adminVerifyOtp: async (data) => {
    const response = await api.post('/admin/verify-otp', data);
    return response.data;
  },

  adminResetPassword: async (data) => {
    const response = await api.post('/admin/reset-password', data);
    return response.data;
  },

  getAdminProfile: async () => {
    const response = await api.get('/admin/profile');
    return response.data;
  },

  updateAdminProfile: async (data) => {
    const response = await api.put('/admin/profile', data);
    return response.data;
  },

  // Common
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;