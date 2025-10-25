import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import itemService from '../../services/itemService';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container">
          <FiShoppingBag size={80} className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Add items to your cart to see them here</p>
          <Link to="/products" className="btn btn-primary btn-large">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Shopping Cart</h1>
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.itemId} className="cart-item">
                <img
                  src={itemService.getImageUrl(item.imgname)}
                  alt={item.itemName}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                  }}
                />
                <div className="cart-item-details">
                  <h3>{item.itemName}</h3>
                  <p className="cart-item-category">{item.itemCategory}</p>
                  <p className="cart-item-price">{formatPrice(item.itemCost)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}
                      className="quantity-btn"
                      disabled={item.quantity >= item.itemQuantity}
                    >
                      +
                    </button>
                  </div>
                  <p className="item-total">{formatPrice(item.itemCost * item.quantity)}</p>
                  <button
                    onClick={() => removeFromCart(item.itemId)}
                    className="remove-btn"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary btn-block btn-large">
              Proceed to Checkout
            </button>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;