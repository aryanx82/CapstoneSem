import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/signin');
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    } catch {
      navigate('/signin');
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-hero">
          <div className="avatar-circle">
            <span className="avatar-initials">
              {(user.name || user.email || '?')
                .trim()
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
          <div className="hero-text">
            <h1>{user.name || 'Your Profile'}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-grid">
          <section className="profile-card overview-card">
            <h2>Overview</h2>
            <p className="muted">
              This is your personal space. Here you can see a quick overview of your
              account details. In the future, you can add course progress, saved
              courses and more.
            </p>
          </section>

          <section className="profile-card details-card">
            <h2>Account Details</h2>
            <div className="profile-row">
              <span className="label">Name</span>
              <span className="value">{user.name || 'Not provided'}</span>
            </div>
            <div className="profile-row">
              <span className="label">Email</span>
              <span className="value">{user.email}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
