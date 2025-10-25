import React, { useEffect, useState } from 'react';
import { FiTrash2, FiStar } from 'react-icons/fi';
import { toast } from 'react-toastify';
import reviewService from '../../services/reviewService';
import { formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import './ManageReviews.css';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await reviewService.getAllReviews();
      if (response.success) {
        setReviews(response.data);
      }
    } catch (error) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await reviewService.deleteReview(reviewId);
        if (response.success) {
          toast.success('Review deleted successfully');
          loadReviews();
        }
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="manage-reviews-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Manage Reviews</h1>
          <p className="page-description">View and moderate customer reviews</p>
        </div>

        {reviews.length === 0 ? (
          <div className="no-reviews">
            <FiStar size={80} className="no-reviews-icon" />
            <p>No reviews yet</p>
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.reviewId} className="review-card">
                <div className="review-header">
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={18}
                        className={`star ${i < review.rating ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(review.reviewId)}
                    className="delete-btn"
                    title="Delete review"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="review-body">
                  <p className="review-text">{review.reviewText}</p>
                </div>

                <div className="review-footer">
                  <span className="review-author">By: {review.addedBy}</span>
                  <span className="review-date">{formatDateTime(review.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReviews;