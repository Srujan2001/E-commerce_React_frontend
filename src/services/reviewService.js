import api from './api';

const reviewService = {
  addReview: async (data) => {
    const response = await api.post('/reviews/add', data);
    return response.data;
  },

  getReviewsByItemId: async (itemId) => {
    const response = await api.get(`/reviews/item/${itemId}`);
    return response.data;
  },

  getAllReviews: async () => {
    const response = await api.get('/reviews/all');
    return response.data;
  },

  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/delete/${id}`);
    return response.data;
  },
};

export default reviewService;