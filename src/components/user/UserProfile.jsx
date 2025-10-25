import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiMapPin } from 'react-icons/fi';
import authService from '../../services/authService';
import './UserProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await authService.getUserProfile();
      if (response.success) {
        setProfile(response.data);
      }
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="container">Profile not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Profile</h1>
          <p className="page-description">View your account information</p>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">
            <FiUser size={64} />
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-item">
              <div className="info-icon">
                <FiUser size={20} />
              </div>
              <div className="info-content">
                <label>Username</label>
                <p>{profile.username}</p>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-icon">
                <FiMail size={20} />
              </div>
              <div className="info-content">
                <label>Email</label>
                <p>{profile.useremail}</p>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-icon">
                <FiMapPin size={20} />
              </div>
              <div className="info-content">
                <label>Address</label>
                <p>{profile.address || 'Not provided'}</p>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-icon">
                <FiUser size={20} />
              </div>
              <div className="info-content">
                <label>Gender</label>
                <p>{profile.gender || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;