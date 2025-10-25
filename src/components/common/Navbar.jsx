import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-icon">🛒</span>
          SHOPVERSE
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>

          {user ? (
            <>
              {user.role === 'USER' && (
                <>
                  <Link to="/cart" className="navbar-link cart-link" onClick={() => setIsMenuOpen(false)}>
                    <FiShoppingCart size={20} />
                    Cart
                    {getCartCount() > 0 && (
                      <span className="cart-badge">{getCartCount()}</span>
                    )}
                  </Link>
                  <Link to="/orders" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </Link>
                  <Link to="/user/dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    <FiUser size={20} />
                    {user.username}
                  </Link>
                </>
              )}

              {user.role === 'ADMIN' && (
                <>
                  <Link to="/admin/dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/admin/items" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Manage Items
                  </Link>
                  <Link to="/admin/orders" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </Link>
                </>
              )}

              <button onClick={handleLogout} className="navbar-link logout-btn">
                <FiLogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/user/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/user/register" className="navbar-link navbar-cta" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;