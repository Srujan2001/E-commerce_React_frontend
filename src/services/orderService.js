import api from './api';

const orderService = {
  createOrder: async (data) => {
    const response = await api.post('/orders/create', data);
    return response.data;
  },

  verifyPayment: async (data) => {
    const response = await api.post('/orders/verify', data);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get('/orders/all');
    return response.data;
  },

  loadRazorpay: () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  },
};

export default orderService;