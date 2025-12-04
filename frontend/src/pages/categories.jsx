import React from 'react';
import './categories.css';

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: "Programming",
      description: "Learn coding languages and software development",
      courses: 1250,
      icon: "💻",
      color: "#3B82F6"
    },
    {
      id: 2,
      title: "Data Science",
      description: "Master data analysis, machine learning, and AI",
      courses: 892,
      icon: "📊",
      color: "#10B981"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Boost your marketing skills and grow your business",
      courses: 634,
      icon: "📱",
      color: "#F59E0B"
    },
    {
      id: 4,
      title: "Design",
      description: "Create beautiful designs and user experiences",
      courses: 567,
      icon: "🎨",
      color: "#EC4899"
    },
    {
      id: 5,
      title: "Business",
      description: "Develop business skills and leadership abilities",
      courses: 423,
      icon: "💼",
      color: "#8B5CF6"
    },
    {
      id: 6,
      title: "Photography",
      description: "Capture stunning photos and master visual storytelling",
      courses: 289,
      icon: "📷",
      color: "#06B6D4"
    }
  ];

  return (
    <div className="categories-page">
      <section className="categories-hero">
        <div className="hero-content">
          <h1>Explore Categories</h1>
          <p>Find the perfect course for your learning goals</p>
        </div>
      </section>

      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  <span className="icon">{category.icon}</span>
                </div>
                <h3 className="category-title">{category.title}</h3>
                <p className="category-description">{category.description}</p>
                <div className="course-count">{category.courses} courses available</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
