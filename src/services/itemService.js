import api from './api';

const itemService = {
  getAllItems: async () => {
    const response = await api.get('/items/all');
    return response.data;
  },

  getItemById: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  getItemsByCategory: async (category) => {
    const response = await api.get(`/items/category/${category}`);
    return response.data;
  },

  searchItems: async (keyword) => {
    const response = await api.get(`/items/search?keyword=${keyword}`);
    return response.data;
  },

  getItemsByAdmin: async () => {
    const response = await api.get('/items/admin');
    return response.data;
  },

  addItem: async (formData) => {
    const response = await api.post('/items/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateItem: async (id, formData) => {
    const response = await api.put(`/items/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteItem: async (id) => {
    const response = await api.delete(`/items/delete/${id}`);
    return response.data;
  },

  getImageUrl: (filename) => {
    if (!filename) return 'https://via.placeholder.com/300x300?text=No+Image';
    return `http://localhost:8080/api/uploads/${filename}`;
  }
};

export default itemService;