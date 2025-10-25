import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiStar, FiMail, FiPlus } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import itemService from '../../services/itemService';
import orderService from '../../services/orderService';
import reviewService from '../../services/reviewService';
import '../user/UserDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalItems: 0,
    totalOrders: 0,
    totalReviews: 0,
  });
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [itemsResponse, ordersResponse, reviewsResponse] = await Promise.all([
        itemService.getItemsByAdmin(),
        orderService.getAllOrders(),
        reviewService.getAllReviews(),
      ]);

      setStats({
        totalItems: itemsResponse.data?.length || 0,
        totalOrders: ordersResponse.data?.length || 0,
        totalReviews: reviewsResponse.data?.length || 0,
      });

      if (itemsResponse.data) {
        setRecentItems(itemsResponse.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-description">Welcome back, {user?.username}!</p>
        </div>

        <div className="dashboard-grid">
          <Link to="/admin/items/add" className="dashboard-card">
            <div className="dashboard-icon">
              <FiPlus size={32} />
            </div>
            <h3>Add Item</h3>
            <p>Add new product</p>
          </Link>

          <Link to="/admin/items" className="dashboard-card">
            <div className="dashboard-icon">
              <FiShoppingBag size={32} />
            </div>
            <h3>My Items</h3>
            <p>{stats.totalItems} total items</p>
          </Link>

          <Link to="/admin/orders" className="dashboard-card">
            <div className="dashboard-icon">
              <FiPackage size={32} />
            </div>
            <h3>Orders</h3>
            <p>{stats.totalOrders} total orders</p>
          </Link>

          <Link to="/admin/reviews" className="dashboard-card">
            <div className="dashboard-icon">
              <FiStar size={32} />
            </div>
            <h3>Reviews</h3>
            <p>{stats.totalReviews} total reviews</p>
          </Link>

          <Link to="/admin/contacts" className="dashboard-card">
            <div className="dashboard-icon">
              <FiMail size={32} />
            </div>
            <h3>Messages</h3>
            <p>View contact messages</p>
          </Link>
        </div>

        {recentItems.length > 0 && (
          <div className="recent-orders-section">
            <h2 className="section-title">Recent Items</h2>
            <div className="orders-list">
              {recentItems.map((item) => (
                <div key={item.itemId} className="order-item">
                  <div className="order-info">
                    <h4>{item.itemName}</h4>
                    <p>{item.itemCategory}</p>
                  </div>
                  <div className="order-details">
                    <span className="order-total">₹{item.itemCost}</span>
                    <span className="order-status completed">
                      Stock: {item.itemQuantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;