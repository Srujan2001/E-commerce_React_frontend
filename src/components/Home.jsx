import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTrendingUp, FiShield, FiTruck } from 'react-icons/fi';
import itemService from '../services/itemService';
import ProductCard from './product/ProductCard';
import { categories } from '../utils/helpers';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await itemService.getAllItems();
      if (response.success) {
        setFeaturedProducts(response.data.slice(0, 8));
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="hero-brand">SHOPVERSE</span>
          </h1>
          <p className="hero-description">
            Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, secure delivery.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-large">
              <FiShoppingBag size={20} />
              Shop Now
            </Link>
            <Link to="/user/register" className="btn btn-secondary btn-large">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiShoppingBag size={32} />
              </div>
              <h3>Wide Selection</h3>
              <p>Thousands of products across multiple categories</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiTruck size={32} />
              </div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiShield size={32} />
              </div>
              <h3>Secure Payment</h3>
              <p>Safe and encrypted payment processing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiTrendingUp size={32} />
              </div>
              <h3>Best Prices</h3>
              <p>Competitive prices and regular discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products/category/${category}`}
                className="category-card"
              >
                <h3>{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="view-all-link">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.itemId} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;