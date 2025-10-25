import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, truncateText } from '../../utils/helpers';
import itemService from '../../services/itemService';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user || user.role !== 'USER') {
      toast.error('Please login as a user to add items to cart');
      return;
    }
    addToCart(product);
    toast.success('Item added to cart!');
  };

  return (
    <Link to={`/products/${product.itemId}`} className="product-card">
      <div className="product-image-container">
        <img
          src={itemService.getImageUrl(product.imgname)}
          alt={product.itemName}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        {product.itemQuantity === 0 && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{truncateText(product.itemName, 50)}</h3>
        <p className="product-category">{product.itemCategory}</p>
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.itemCost)}</span>
          {product.itemQuantity > 0 && user?.role === 'USER' && (
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              <FiShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;