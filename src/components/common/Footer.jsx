import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">SHOPVERSE</h3>
            <p className="footer-description">
              Your one-stop destination for quality products at the best prices.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/user/login">Login</Link></li>
              <li><Link to="/admin/login">Admin</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products/category/Electronics">Electronics</Link></li>
              <li><Link to="/products/category/Fashion">Fashion</Link></li>
              <li><Link to="/products/category/Home & Kitchen">Home & Kitchen</Link></li>
              <li><Link to="/products/category/Books">Books</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FiGithub size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FiLinkedin size={24} />
              </a>
              <a href="mailto:support@shopverse.com">
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2024 SHOPVERSE. Made with <FiHeart className="heart-icon" /> by Your Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;