import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import orderService from '../../services/orderService';
import { formatPrice } from '../../utils/helpers';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway');
        setLoading(false);
        return;
      }

      // Process each cart item
      for (const item of cartItems) {
        // Create Razorpay order
        const orderResponse = await orderService.createOrder({
          itemId: item.itemId,
          itemName: item.itemName,
          total: item.itemCost * item.quantity,
          quantity: item.quantity,
        });

        if (!orderResponse.success) {
          toast.error('Failed to create order');
          setLoading(false);
          return;
        }

        const orderData = orderResponse.data;

        // Configure Razorpay options
        const options = {
          key: 'rzp_test_IVOKUPstFIL8G6',
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'SHOPVERSE',
          description: item.itemName,
          order_id: orderData.id,
          handler: async function (response) {
            try {
              // Verify payment
              const verifyResponse = await orderService.verifyPayment({
                itemId: item.itemId,
                itemName: item.itemName,
                total: item.itemCost * item.quantity,
                quantity: item.quantity,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              });

              if (verifyResponse.success) {
                toast.success(`Payment successful for ${item.itemName}`);
              }
            } catch (error) {
              console.error('Payment verification failed:', error);
              toast.error('Payment verification failed');
            }
          },
          prefill: {
            name: 'Customer',
            email: 'customer@example.com',
          },
          theme: {
            color: '#3b82f6',
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }

      // Clear cart after all orders are processed
      clearCart();
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Checkout</h1>
          <p className="page-description">Review your order and complete payment</p>
        </div>

        <div className="checkout-layout">
          <div className="order-summary-section">
            <h2>Order Summary</h2>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.itemId} className="checkout-item">
                  <img
                    src={`http://localhost:8080/api/uploads/${item.imgname}`}
                    alt={item.itemName}
                    className="checkout-item-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                    }}
                  />
                  <div className="checkout-item-details">
                    <h3>{item.itemName}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="checkout-item-price">
                    {formatPrice(item.itemCost * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-total">
              <div className="total-row">
                <span>Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total-divider"></div>
              <div className="total-row total-final">
                <span>Total</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h2>Payment</h2>
            <p className="payment-info">
              Click the button below to proceed with secure payment via Razorpay
            </p>
            <button
              onClick={handlePayment}
              className="btn btn-primary btn-block btn-large"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay ${formatPrice(getCartTotal())}`}
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="btn btn-secondary btn-block"
              disabled={loading}
            >
              Back to Cart
            </button>
            <div className="payment-secure">
              <p>🔒 Secure Payment</p>
              <p className="payment-note">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;