import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import './Auth.css';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email not found. Please register again.');
      navigate('/user/register');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.userVerifyOtp({ email, otp });
      toast.success(response.message);
      navigate('/user/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;
    try {
      await authService.userRegister({ email });
      toast.success('OTP resent successfully!');
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Verify OTP</h2>
          <p className="auth-subtitle">
            We've sent a verification code to <strong>{email}</strong>
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-input"
                placeholder="Enter 6-character OTP"
                required
                maxLength={6}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Didn't receive the code?</span>
          </div>

          <button onClick={handleResendOtp} className="btn btn-secondary btn-block">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;