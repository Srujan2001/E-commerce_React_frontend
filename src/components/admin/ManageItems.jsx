import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import itemService from '../../services/itemService';
import { formatPrice } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import './ManageItems.css';

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await itemService.getItemsByAdmin();
      if (response.success) {
        setItems(response.data);
      }
    } catch (error) {
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId, itemName) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      try {
        const response = await itemService.deleteItem(itemId);
        if (response.success) {
          toast.success('Item deleted successfully');
          loadItems();
        }
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="manage-items-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Items</h1>
            <p className="page-description">View and manage your products</p>
          </div>
          <Link to="/admin/items/add" className="btn btn-primary">
            <FiPlus size={20} />
            Add New Item
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="no-items">
            <p>No items found. Add your first product!</p>
            <Link to="/admin/items/add" className="btn btn-primary btn-large">
              <FiPlus size={20} />
              Add Item
            </Link>
          </div>
        ) : (
          <div className="items-table-container">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.itemId}>
                    <td>
                      <img
                        src={itemService.getImageUrl(item.imgname)}
                        alt={item.itemName}
                        className="table-item-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                        }}
                      />
                    </td>
                    <td className="item-name">{item.itemName}</td>
                    <td>{item.itemCategory}</td>
                    <td className="item-price">{formatPrice(item.itemCost)}</td>
                    <td>
                      <span className={`stock-badge ${item.itemQuantity === 0 ? 'out-of-stock' : ''}`}>
                        {item.itemQuantity} units
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/items/edit/${item.itemId}`}
                          className="action-btn edit-btn"
                          title="Edit"
                        >
                          <FiEdit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.itemId, item.itemName)}
                          className="action-btn delete-btn"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
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

export default ManageItems;