import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import itemService from '../../services/itemService';
import reviewService from '../../services/reviewService';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, formatDate } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    loadProductDetails();
    loadReviews();
  }, [id]);

  const loadProductDetails = async () => {
    try {
      const response = await itemService.getItemById(id);
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await reviewService.getReviewsByItemId(id);
      if (response.success) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleAddToCart = () => {
    if (!user || user.role !== 'USER') {
      toast.error('Please login as a user to add items to cart');
      navigate('/user/login');
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity} item(s) added to cart!`);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'USER') {
      toast.error('Please login to add a review');
      return;
    }
    try {
      const response = await reviewService.addReview({
        itemId: id,
        reviewText,
        rating,
      });
      if (response.success) {
        toast.success('Review added successfully!');
        setReviewText('');
        setRating(5);
        loadReviews();
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft size={20} />
          Back
        </button>

        <div className="product-detail-grid">
          <div className="product-image-section">
            <img
              src={itemService.getImageUrl(product.imgname)}
              alt={product.itemName}
              className="product-detail-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
              }}
            />
          </div>

          <div className="product-info-section">
            <span className="product-category-badge">{product.itemCategory}</span>
            <h1 className="product-detail-title">{product.itemName}</h1>
            <p className="product-detail-price">{formatPrice(product.itemCost)}</p>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span className={`meta-value ${product.itemQuantity === 0 ? 'out-of-stock' : ''}`}>
                  {product.itemQuantity > 0 ? `${product.itemQuantity} available` : 'Out of Stock'}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Seller:</span>
                <span className="meta-value">{product.addedBy}</span>
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            {product.itemQuantity > 0 && user?.role === 'USER' && (
              <div className="purchase-section">
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.itemQuantity, quantity + 1))}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <button onClick={handleAddToCart} className="btn btn-primary btn-large">
                  <FiShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2 className="section-title">Customer Reviews</h2>

          {user?.role === 'USER' && (
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="rating-input">
                <label>Rating:</label>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      size={24}
                      className={`star ${rating >= star ? 'filled' : ''}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="review-textarea"
                required
              />
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          )}

          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.reviewId} className="review-card">
                  <div className="review-header">
                    <span className="review-author">{review.addedBy}</span>
                    <div className="review-rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <FiStar key={i} size={16} className="star filled" />
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{review.reviewText}</p>
                  <span className="review-date">{formatDate(review.createdAt)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;