import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiPackage, FiUser, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import orderService from '../../services/orderService';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    cartItems: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const ordersResponse = await orderService.getMyOrders();
      if (ordersResponse.success) {
        setRecentOrders(ordersResponse.data.slice(0, 5));
        setStats({
          totalOrders: ordersResponse.data.length,
          cartItems: getCartCount(),
        });
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Welcome, {user?.username}!</h1>
          <p className="page-description">Manage your account and orders</p>
        </div>

        <div className="dashboard-grid">
          <Link to="/user/profile" className="dashboard-card">
            <div className="dashboard-icon">
              <FiUser size={32} />
            </div>
            <h3>Profile</h3>
            <p>View and edit your profile</p>
          </Link>

          <Link to="/cart" className="dashboard-card">
            <div className="dashboard-icon">
              <FiShoppingCart size={32} />
            </div>
            <h3>Cart</h3>
            <p>{stats.cartItems} items in cart</p>
          </Link>

          <Link to="/orders" className="dashboard-card">
            <div className="dashboard-icon">
              <FiPackage size={32} />
            </div>
            <h3>Orders</h3>
            <p>{stats.totalOrders} total orders</p>
          </Link>

          <Link to="/products" className="dashboard-card">
            <div className="dashboard-icon">
              <FiShoppingBag size={32} />
            </div>
            <h3>Shop</h3>
            <p>Browse products</p>
          </Link>
        </div>

        <div className="recent-orders-section">
          <h2 className="section-title">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <div className="no-orders">
              <p>No orders yet</p>
              <Link to="/products" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="orders-list">
              {recentOrders.map((order) => (
                <div key={order.orderId} className="order-item">
                  <div className="order-info">
                    <h4>{order.itemName}</h4>
                    <p>Order ID: #{order.orderId}</p>
                  </div>
                  <div className="order-details">
                    <span className="order-total">₹{order.total}</span>
                    <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;