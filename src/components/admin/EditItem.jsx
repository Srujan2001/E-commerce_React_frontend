import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import itemService from '../../services/itemService';
import { categories } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import './ItemForm.css';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    itemCost: '',
    itemQuantity: '',
    itemCategory: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      const response = await itemService.getItemById(id);
      if (response.success) {
        const item = response.data;
        setFormData({
          itemName: item.itemName,
          description: item.description || '',
          itemCost: item.itemCost,
          itemQuantity: item.itemQuantity,
          itemCategory: item.itemCategory,
        });
        if (item.imgname) {
          setCurrentImage(itemService.getImageUrl(item.imgname));
        }
      }
    } catch (error) {
      toast.error('Failed to load item');
      navigate('/admin/items');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('itemName', formData.itemName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('itemCost', formData.itemCost);
      formDataToSend.append('itemQuantity', formData.itemQuantity);
      formDataToSend.append('itemCategory', formData.itemCategory);
      if (imageFile) {
        formDataToSend.append('file', imageFile);
      }

      const response = await itemService.updateItem(id, formDataToSend);
      if (response.success) {
        toast.success('Item updated successfully!');
        navigate('/admin/items');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update item');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="item-form-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft size={20} />
          Back
        </button>

        <div className="page-header">
          <h1 className="page-title">Edit Item</h1>
          <p className="page-description">Update product information</p>
        </div>

        <div className="item-form-container">
          <form onSubmit={handleSubmit} className="item-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Item Name *</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="itemCategory"
                  value={formData.itemCategory}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input
                  type="number"
                  name="itemCost"
                  value={formData.itemCost}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  name="itemQuantity"
                  value={formData.itemQuantity}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                rows="4"
                placeholder="Enter product description..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Product Image</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                />
                <label htmlFor="image-upload" className="image-upload-label">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  ) : currentImage ? (
                    <img src={currentImage} alt="Current" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <FiUpload size={48} />
                      <p>Click to upload image</p>
                      <span>PNG, JPG, JPEG (Max 10MB)</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
                disabled={submitting}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Updating Item...' : 'Update Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItem;