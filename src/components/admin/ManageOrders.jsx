import React, { useEffect, useState } from 'react';
import { FiPackage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import orderService from '../../services/orderService';
import { formatPrice, formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'ALL') return true;
    return order.orderStatus === filter;
  });

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
    <div className="manage-orders-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Manage Orders</h1>
          <p className="page-description">View and manage all customer orders</p>
        </div>

        <div className="orders-filter">
          <button
            className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            All Orders ({orders.length})
          </button>
          <button
            className={`filter-btn ${filter === 'COMPLETED' ? 'active' : ''}`}
            onClick={() => setFilter('COMPLETED')}
          >
            Completed ({orders.filter((o) => o.orderStatus === 'COMPLETED').length})
          </button>
          <button
            className={`filter-btn ${filter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setFilter('PENDING')}
          >
            Pending ({orders.filter((o) => o.orderStatus === 'PENDING').length})
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <FiPackage size={80} className="no-orders-icon" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item Name</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="order-id">#{order.orderId}</td>
                    <td className="item-name">{order.itemName}</td>
                    <td>{order.paymentBy}</td>
                    <td className="order-total">{formatPrice(order.total)}</td>
                    <td className="payment-id">{order.paymentId}</td>
                    <td>{formatDateTime(order.createdAt)}</td>
                    <td>
                      <span className={`order-status ${getStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;