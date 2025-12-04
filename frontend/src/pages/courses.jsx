import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCourses, createCourse, deleteCourse, fetchBookmarks, toggleBookmark } from '../api/axios.js';
import './courses.css';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [courses, setCourses] = useState([]); // backend courses
  const [bookmarks, setBookmarks] = useState(new Set());
  const [user, setUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    rating: "",
    category: "",
    level: "BEGINNER",
    price: "",
    image: "",
  });

  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setError('');
      try {
        const [coursesRes, bookmarksRes] = await Promise.all([
          fetchCourses(),
          fetchBookmarks(),
        ]);
        setCourses(coursesRes.data || []);
        const ids = new Set((bookmarksRes.data || []).map(b => String(b.courseId)));
        setBookmarks(ids);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load courses');
      }
    };

    loadData();
  }, []);

  // Remove hardcoded courses - load all from backend
const allCourses = courses;

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Sort courses: newest first for 'Most Popular', then by rating/price
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'Most Popular') {
      // Show newest courses first (by createdAt), then by rating
      const aDate = new Date(a.createdAt || 0);
      const bDate = new Date(b.createdAt || 0);
      if (aDate !== bDate) return bDate - aDate; // newest first
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === 'Highest Rated') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === 'Lowest Price') {
      return (a.price || 0) - (b.price || 0);
    }
    return 0;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
    } else {
      setSearchParams({});
    }
  };

  const getCourseIdForBookmark = (course) => {
    if (course._id) return String(course._id);
    return `static-${course.id}`;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      instructor: '',
      rating: '',
      category: '',
      level: 'BEGINNER',
      price: '',
      image: '',
    });
    setShowForm(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    try {
      const payload = {
        ...formData,
        rating: formData.rating ? Number(formData.rating) : 0,
        price: formData.price ? Number(formData.price) : 0,
      };
      const res = await createCourse(payload);
      setCourses(prev => [res.data, ...prev]);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create course');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleBookmark = async (course) => {
    const courseId = getCourseIdForBookmark(course);
    const body = {
      id: courseId,
      title: course.title,
      instructor: course.instructor,
      rating: course.rating,
      students: course.students,
      category: course.category,
      level: course.level,
      price: course.price,
      image: course.image,
    };
    try {
      const res = await toggleBookmark(body);
      const bookmarked = !!res.data?.bookmarked;
      setBookmarks(prev => {
        const next = new Set(prev);
        if (bookmarked) next.add(courseId);
        else next.delete(courseId);
        return next;
      });
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await deleteCourse(courseId);
      setCourses(prev => prev.filter(c => c._id !== courseId));
    } catch (err) {
      console.error('Failed to delete course:', err);
      alert('Failed to delete course');
    }
  };

  return (
    <div className="courses-page">
      <div className="courses-container">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <span role="img" aria-label="search" className="search-icon">🔍</span>
            <h3>Filters</h3>
          </div>
          
          <div className="filter-section">
            <label className="filter-label">Search</label>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Categories</h4>
            <div className="radio-group">
              {['All', 'Programming', 'Data Science', 'Marketing', 'Design', 'Business'].map(category => (
                <label key={category} className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span className="radio-text">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Level</h4>
            <div className="radio-group">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                <label key={level} className="radio-label">
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    checked={selectedLevel === level}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  />
                  <span className="radio-text">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
        
        <main className="course-listings">
          <div className="listings-header">
            <div className="listings-title">
              <h1>All Courses</h1>
              <p>Showing {filteredCourses.length} of {allCourses.length} courses</p>
              <button
                className="create-course-toggle"
                type="button"
                onClick={() => setShowForm(true)}
              >
                Create Course
              </button>
            </div>
            <div className="sort-section">
              <label className="sort-label">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="Most Popular">Most Popular</option>
                <option value="Newest">Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Rating">Rating</option>
              </select>
            </div>
          </div>

          {(showForm) && (
            <div className="course-form-container">
              {error && <div className="courses-error">{error}</div>}
              <form onSubmit={handleSubmit} className="course-form">
                <h2>Create Course</h2>
                <div className="form-row">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Title"
                    required
                  />
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleFormChange}
                    placeholder="Instructor"
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleFormChange}
                    placeholder="Rating (0-5)"
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    placeholder="Category"
                    required
                  />
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleFormChange}
                  >
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="ADVANCED">ADVANCED</option>
                  </select>
                </div>
                <div className="form-row">
                  <input
                    type="number"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="Price"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Course Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  {formData.image && (
                    <div className="image-preview">
                      <img src={formData.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '8px', borderRadius: '4px' }} />
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <button type="submit" disabled={formLoading}>
                    {formLoading ? 'Creating...' : 'Create Course'}
                  </button>
                  <button type="button" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="course-grid">
            {sortedCourses.map(course => (
              <div key={course._id || course.id} className="course-card">
                <div className="card-actions">
                  <button
                    type="button"
                    className="bookmark-button"
                    onClick={() => handleToggleBookmark(course)}
                  >
                    {bookmarks.has(getCourseIdForBookmark(course)) ? '★' : '☆'}
                  </button>
                  {user && String(course.createdBy) === String(user.id) && (
                    <button
                      type="button"
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCourse(course._id);
                      }}
                      title="Delete course"
                    >
                      🗑
                    </button>
                  )}
                </div>
                <span className={`badge ${course.level?.toLowerCase()}`}>
                  {course.level}
                </span>
                <img src={course.image} alt={course.title} />
                <h3>{course.title}</h3>
                <p className="instructor">by {course.instructor}</p>
                <div className="stats-row">
                  <div className="rating">
                    <span role="img" aria-label="star">⭐</span>
                    <span>{course.rating}</span>
                  </div>
                  <div className="students">
                    <span role="img" aria-label="students">👥</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
                <div className="bottom-row">
                  <div className="category-tag">{course.category}</div>
                  <div className="price">${course.price}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
