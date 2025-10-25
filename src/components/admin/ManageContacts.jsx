import React, { useEffect, useState } from 'react';
import { FiTrash2, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import './ManageContacts.css';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/contact/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
          `http://localhost:8080/api/contact/delete/${contactId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          toast.success('Message deleted successfully');
          loadContacts();
        }
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="manage-contacts-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Contact Messages</h1>
          <p className="page-description">View messages from customers</p>
        </div>

        {contacts.length === 0 ? (
          <div className="no-contacts">
            <FiMail size={80} className="no-contacts-icon" />
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="contacts-grid">
            {contacts.map((contact) => (
              <div key={contact.contactId} className="contact-card">
                <div className="contact-header">
                  <div className="contact-info">
                    <h3 className="contact-name">{contact.name}</h3>
                    <a href={`mailto:${contact.email}`} className="contact-email">
                      {contact.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(contact.contactId)}
                    className="delete-btn"
                    title="Delete message"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="contact-body">
                  <p className="contact-message">{contact.message}</p>
                </div>

                <div className="contact-footer">
                  <span className="contact-date">{formatDateTime(contact.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContacts;