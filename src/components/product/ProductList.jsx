import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import itemService from '../../services/itemService';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import LoadingSpinner from '../common/LoadingSpinner';
import { categories } from '../../utils/helpers';
import './ProductList.css';

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let response;
      if (category) {
        response = await itemService.getItemsByCategory(category);
      } else {
        response = await itemService.getAllItems();
      }
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      loadProducts();
      return;
    }
    setLoading(true);
    try {
      const response = await itemService.searchItems(keyword);
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (cat) => {
    setSelectedCategory(cat);
    setLoading(true);
    try {
      let response;
      if (cat === 'All') {
        response = await itemService.getAllItems();
      } else {
        response = await itemService.getItemsByCategory(cat);
      }
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-list-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            {category ? `${category} Products` : 'All Products'}
          </h1>
          <p className="page-description">
            Browse our wide selection of quality products
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="filters">
          <button
            className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => handleCategoryFilter('All')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <div className="no-products">
            <p>No products found</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.itemId} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;