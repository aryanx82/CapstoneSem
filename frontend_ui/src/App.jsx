import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Courses from './pages/courses';
import Categories from './pages/categories';
import About from './pages/about';
import Contact from './pages/contact';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo">
          <span role="img" aria-label="cap" className="logo-icon">🎓</span>
          <span className="logo-text">Course<span className="highlight">Hub</span></span>
        </div>
      </Link>
      <ul className="routes">
        <li className="route">
          <Link to="/courses" style={{ textDecoration: 'none', color: 'inherit' }}>Courses</Link>
        </li>
        <li className="route">
          <Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>Categories</Link>
        </li>
        <li className="route">
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
        </li>
        <li className="route">
          <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
        </li>
      </ul>
      <div className="navbar__buttons">
        <Link to="/signin" style={{ textDecoration: 'none' }}>
          <button className="btn-outline">Sign In</button>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <button className="btn-filled">Get Started</button>
        </Link>
      </div>
    </nav>
  );
}

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div>
      <section className="home">
        <div className="content">
          <h1>Discover Your Next <br /> Learning Adventure</h1>
          <p>
            Explore thousands of courses from world-class instructors. Build skills that matter
            and advance your career with confidence.
          </p>
          <form onSubmit={handleSearch} className="search-bar">
            <input 
              type="text" 
              placeholder="What do you want to learn today?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button type="submit" className="search-btn">
              <span role="img" aria-label="search">🔍</span> Search
            </button>
          </form>
          <div className="stats">
            <div>
              <h2>50K+</h2>
              <p>Active Students</p>
            </div>
            <div>
              <h2>1,200+</h2>
              <p>Expert Instructors</p>
            </div>
            <div>
              <h2>5,000+</h2>
              <p>Online Courses</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="featured-title">Featured Courses</h2>
        <div className="featured-courses">
          <div className="course-card">
            <span className="badge beginner">BEGINNER</span>
            <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80" alt="Complete Python Bootcamp" />
            <h3>Complete Python Bootcamp</h3>
            <p className="instructor">by Dr. Angela Yu</p>
            <div className="stats-row">
              <div className="rating">
                <span role="img" aria-label="star">⭐</span>
                <span>4.8</span>
              </div>
              <div className="students">
                <span role="img" aria-label="students">👥</span>
                <span>15,420 students</span>
              </div>
            </div>
            <div className="bottom-row">
              <div className="category-tag">Programming</div>
              <div className="price">$89.99</div>
            </div>
          </div>
          
          <div className="course-card">
            <span className="badge intermediate">INTERMEDIATE</span>
            <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80" alt="React - The Complete Guide" />
            <h3>React - The Complete Guide</h3>
            <p className="instructor">by Maximilian Schwarzmüller</p>
            <div className="stats-row">
              <div className="rating">
                <span role="img" aria-label="star">⭐</span>
                <span>4.9</span>
              </div>
              <div className="students">
                <span role="img" aria-label="students">👥</span>
                <span>28,350 students</span>
              </div>
            </div>
            <div className="bottom-row">
              <div className="category-tag">Programming</div>
              <div className="price">$94.99</div>
            </div>
          </div>
          
          <div className="course-card">
            <span className="badge beginner">BEGINNER</span>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Digital Marketing Masterclass" />
            <h3>Digital Marketing Masterclass</h3>
            <p className="instructor">by Sarah Johnson</p>
            <div className="stats-row">
              <div className="rating">
                <span role="img" aria-label="star">⭐</span>
                <span>4.7</span>
              </div>
              <div className="students">
                <span role="img" aria-label="students">👥</span>
                <span>12,890 students</span>
              </div>
            </div>
            <div className="bottom-row">
              <div className="category-tag">Marketing</div>
              <div className="price">$79.99</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}
