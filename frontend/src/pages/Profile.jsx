import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBookmarks, toggleBookmark, fetchCourses, deleteCourse } from '../api/axios.js';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);
  const [bookmarkError, setBookmarkError] = useState('');
  const [myCourses, setMyCourses] = useState([]);
  const [loadingMyCourses, setLoadingMyCourses] = useState(false);
  const [myCoursesError, setMyCoursesError] = useState('');

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

  useEffect(() => {
    const loadBookmarks = async () => {
      setLoadingBookmarks(true);
      setBookmarkError('');
      try {
        const res = await fetchBookmarks();
        setBookmarks(res.data || []);
      } catch (err) {
        setBookmarkError(
          err.response?.data?.message || err.message || 'Failed to load bookmarks'
        );
      } finally {
        setLoadingBookmarks(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      loadBookmarks();
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadMyCourses = async () => {
      setLoadingMyCourses(true);
      setMyCoursesError('');
      try {
        const res = await fetchCourses();
        const all = res.data || [];
        const mine = all.filter((c) => String(c.createdBy) === String(user.id));
        setMyCourses(mine);
      } catch (err) {
        setMyCoursesError(
          err.response?.data?.message || err.message || 'Failed to load your courses'
        );
      } finally {
        setLoadingMyCourses(false);
      }
    };

    loadMyCourses();
  }, [user]);

  const handleDeleteMyCourse = async (course) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await deleteCourse(course._id);
      setMyCourses((prev) => prev.filter((c) => c._id !== course._id));
    } catch (err) {
      console.error('Failed to delete course from profile:', err);
      setMyCoursesError(
        err.response?.data?.message || err.message || 'Failed to delete course'
      );
    }
  };

  const handleRemoveBookmark = async (bookmark) => {
    try {
      const payload = {
        id: bookmark.courseId,
        title: bookmark.title,
        instructor: bookmark.instructor,
        rating: bookmark.rating,
        students: bookmark.students,
        category: bookmark.category,
        level: bookmark.level,
        price: bookmark.price,
        image: bookmark.image,
      };
      await toggleBookmark(payload);
      setBookmarks((prev) => prev.filter((b) => b._id !== bookmark._id && b.courseId !== bookmark.courseId));
    } catch (err) {
      console.error('Failed to remove bookmark from profile:', err);
      setBookmarkError(
        err.response?.data?.message || err.message || 'Failed to remove bookmark'
      );
    }
  };

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

          <section className="profile-card my-courses-card">
            <h2>Your Courses</h2>
            {loadingMyCourses && <p className="muted">Loading your courses...</p>}
            {myCoursesError && (
              <p className="error-text">{myCoursesError}</p>
            )}
            {!loadingMyCourses && !myCoursesError && myCourses.length === 0 && (
              <p className="muted">You haven't created any courses yet.</p>
            )}
            <div className="my-courses-list">
              {myCourses.map((course) => (
                <div key={course._id} className="my-course-item">
                  <div className="my-course-thumb">
                    {course.image && (
                      <img src={course.image} alt={course.title} />
                    )}
                  </div>
                  <div className="my-course-info">
                    <h3>{course.title}</h3>
                    <p className="muted">{course.category} · {course.level}</p>
                    <div className="my-course-meta-row">
                      <span className="my-course-price">${course.price}</span>
                      <button
                        type="button"
                        className="my-course-delete-button"
                        onClick={() => handleDeleteMyCourse(course)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-card bookmarks-card">
            <h2>Your Bookmarked Courses</h2>
            {loadingBookmarks && <p className="muted">Loading bookmarks...</p>}
            {bookmarkError && (
              <p className="error-text">{bookmarkError}</p>
            )}
            {!loadingBookmarks && !bookmarkError && bookmarks.length === 0 && (
              <p className="muted">You have not bookmarked any courses yet.</p>
            )}
            <div className="bookmarks-list">
              {bookmarks.map((b) => (
                <div key={b._id || b.courseId} className="bookmark-item">
                  <div className="bookmark-thumb">
                    {b.image && (
                      <img src={b.image} alt={b.title} />
                    )}
                  </div>
                  <div className="bookmark-info">
                    <h3>{b.title}</h3>
                    {b.instructor && (
                      <p className="muted">by {b.instructor}</p>
                    )}
                    <div className="bookmark-meta-row">
                      {b.category && (
                        <span className="bookmark-category">{b.category}</span>
                      )}
                      <button
                        type="button"
                        className="bookmark-remove-button"
                        onClick={() => handleRemoveBookmark(b)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
