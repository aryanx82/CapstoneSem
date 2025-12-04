import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './courses.css';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');


  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const courses = [
    {
      id: 1,
      title: "React - The Complete Guide",
      instructor: "Maximilian Schwarzmüller",
      rating: 4.9,
      students: 28350,
      category: "Programming",
      level: "INTERMEDIATE",
      price: 94.99,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Complete Python Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.8,
      students: 15420,
      category: "Programming",
      level: "BEGINNER",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      instructor: "Sarah Johnson",
      rating: 4.7,
      students: 12500,
      category: "Marketing",
      level: "BEGINNER",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "Data Science with Python",
      instructor: "Alex Chen",
      rating: 4.9,
      students: 18900,
      category: "Data Science",
      level: "INTERMEDIATE",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      instructor: "Emily Rodriguez",
      rating: 4.6,
      students: 9800,
      category: "Design",
      level: "BEGINNER",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      title: "Business Strategy & Leadership",
      instructor: "Michael Thompson",
      rating: 4.8,
      students: 11200,
      category: "Business",
      level: "ADVANCED",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 7,
      title: "JavaScript ES6+ Complete Guide",
      instructor: "Jonas Schmedtmann",
      rating: 4.9,
      students: 22500,
      category: "Programming",
      level: "INTERMEDIATE",
      price: 84.99,
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 8,
      title: "Machine Learning A-Z",
      instructor: "Kirill Eremenko",
      rating: 4.8,
      students: 16800,
      category: "Data Science",
      level: "INTERMEDIATE",
      price: 109.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 9,
      title: "Web Development Bootcamp",
      instructor: "Colt Steele",
      rating: 4.7,
      students: 19800,
      category: "Programming",
      level: "BEGINNER",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 10,
      title: "Graphic Design Masterclass",
      instructor: "Lindsay Marsh",
      rating: 4.6,
      students: 8900,
      category: "Design",
      level: "BEGINNER",
      price: 74.99,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 11,
      title: "Social Media Marketing",
      instructor: "Brian Dean",
      rating: 4.5,
      students: 15600,
      category: "Marketing",
      level: "INTERMEDIATE",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 12,
      title: "Advanced Excel & VBA",
      instructor: "Kyle Pew",
      rating: 4.8,
      students: 13400,
      category: "Business",
      level: "INTERMEDIATE",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 13,
      title: "Node.js Complete Course",
      instructor: "Andrew Mead",
      rating: 4.7,
      students: 18200,
      category: "Programming",
      level: "INTERMEDIATE",
      price: 94.99,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 14,
      title: "Deep Learning Specialization",
      instructor: "Andrew Ng",
      rating: 4.9,
      students: 25600,
      category: "Data Science",
      level: "ADVANCED",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 15,
      title: "Figma UI/UX Design",
      instructor: "Daniel Walter Scott",
      rating: 4.6,
      students: 11200,
      category: "Design",
      level: "INTERMEDIATE",
      price: 84.99,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 16,
      title: "Content Marketing Strategy",
      instructor: "Neil Patel",
      rating: 4.7,
      students: 9800,
      category: "Marketing",
      level: "INTERMEDIATE",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 17,
      title: "Project Management Professional",
      instructor: "Joseph Phillips",
      rating: 4.8,
      students: 14500,
      category: "Business",
      level: "ADVANCED",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 18,
      title: "Vue.js Complete Course",
      instructor: "Maximilian Schwarzmüller",
      rating: 4.8,
      students: 16800,
      category: "Programming",
      level: "INTERMEDIATE",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 19,
      title: "Data Visualization with D3.js",
      instructor: "Adam Janes",
      rating: 4.6,
      students: 8900,
      category: "Data Science",
      level: "INTERMEDIATE",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 20,
      title: "Adobe Photoshop Masterclass",
      instructor: "Phil Ebiner",
      rating: 4.7,
      students: 12300,
      category: "Design",
      level: "BEGINNER",
      price: 74.99,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 21,
      title: "Email Marketing Mastery",
      instructor: "Brendon Burchard",
      rating: 4.5,
      students: 11200,
      category: "Marketing",
      level: "BEGINNER",
      price: 64.99,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 22,
      title: "Financial Analysis & Modeling",
      instructor: "Chris Haroun",
      rating: 4.8,
      students: 9800,
      category: "Business",
      level: "ADVANCED",
      price: 109.99,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 23,
      title: "TypeScript Complete Course",
      instructor: "Stephen Grider",
      rating: 4.7,
      students: 15600,
      category: "Programming",
      level: "INTERMEDIATE",
      price: 94.99,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 24,
      title: "Natural Language Processing",
      instructor: "Lazy Programmer",
      rating: 4.6,
      students: 8900,
      category: "Data Science",
      level: "ADVANCED",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
    } else {
      setSearchParams({});
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
              <p>Showing {filteredCourses.length} of {courses.length} courses</p>
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

          <div className="course-grid">
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <span className={`badge ${course.level.toLowerCase()}`}>
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
