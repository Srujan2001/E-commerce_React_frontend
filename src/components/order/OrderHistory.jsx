import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import orderService from '../../services/orderService';
import { formatPrice, formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await orderService.getMyOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED':
        return 'status-completed';
      case 'PENDING':
        return 'status-pending';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="order-history-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Orders</h1>
          <p className="page-description">View and track your order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <FiPackage size={80} className="no-orders-icon" />
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here</p>
            <Link to="/products" className="btn btn-primary btn-large">
              <FiShoppingBag size={20} />
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <FiPackage size={20} />
                    <span>Order #{order.orderId}</span>
                  </div>
                  <span className={`order-status ${getStatusClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>

                <div className="order-body">
                  <h3 className="order-item-name">{order.itemName}</h3>
                  <div className="order-details">
                    <div className="order-detail-row">
                      <span className="detail-label">Order Date:</span>
                      <span className="detail-value">
                        {formatDateTime(order.createdAt)}
                      </span>
                    </div>
                    <div className="order-detail-row">
                      <span className="detail-label">Payment ID:</span>
                      <span className="detail-value payment-id">
                        {order.paymentId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;