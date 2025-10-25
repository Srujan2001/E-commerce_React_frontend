import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './components/Home';

// User Components
import UserLogin from './components/user/UserLogin';
import UserRegister from './components/user/UserRegister';
import VerifyOtp from './components/user/VerifyOtp';
import ForgotPassword from './components/user/ForgotPassword';
import UserDashboard from './components/user/UserDashboard';
import UserProfile from './components/user/UserProfile';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminRegister from './components/admin/AdminRegister';
import AdminDashboard from './components/admin/AdminDashboard';
import AddItem from './components/admin/AddItem';
import EditItem from './components/admin/EditItem';
import ManageItems from './components/admin/ManageItems';
import ManageOrders from './components/admin/ManageOrders';
import ManageReviews from './components/admin/ManageReviews';
import ManageContacts from './components/admin/ManageContacts';

// Product Components
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';

// Order Components
import Cart from './components/order/Cart';
import Checkout from './components/order/Checkout';
import OrderHistory from './components/order/OrderHistory';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/category/:category" element={<ProductList />} />
          
          {/* User Routes */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/verify-otp" element={<VerifyOtp />} />
          <Route path="/user/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected User Routes */}
          <Route path="/user/dashboard" element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user/profile" element={
            <ProtectedRoute role="USER">
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute role="USER">
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute role="USER">
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute role="USER">
              <OrderHistory />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/items/add" element={
            <ProtectedRoute role="ADMIN">
              <AddItem />
            </ProtectedRoute>
          } />
          <Route path="/admin/items/edit/:id" element={
            <ProtectedRoute role="ADMIN">
              <EditItem />
            </ProtectedRoute>
          } />
          <Route path="/admin/items" element={
            <ProtectedRoute role="ADMIN">
              <ManageItems />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute role="ADMIN">
              <ManageOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/reviews" element={
            <ProtectedRoute role="ADMIN">
              <ManageReviews />
            </ProtectedRoute>
          } />
          <Route path="/admin/contacts" element={
            <ProtectedRoute role="ADMIN">
              <ManageContacts />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;