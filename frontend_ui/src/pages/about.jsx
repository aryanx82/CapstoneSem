import React from 'react';
import './about.css';

export default function About() {
  const features = [
    {
      id: 1,
      title: "Expert Instructors",
      description: "Learn from industry professionals and recognized experts in their fields.",
      icon: "🎓"
    },
    {
      id: 2,
      title: "Diverse Courses",
      description: "Over 5,000 courses covering programming, business, design, and more.",
      icon: "📚"
    },
    {
      id: 3,
      title: "Flexible Learning",
      description: "Learn at your own pace with lifetime access to all course materials.",
      icon: "⚡"
    },
    {
      id: 4,
      title: "Certificates",
      description: "Earn certificates upon completion to showcase your new skills.",
      icon: "🏆"
    }
  ];

  return (
    <div className="page">
      <section className="about">
        <div className="about-content">
          <h1>About CourseHub</h1>
          <p>Empowering learners worldwide with quality education</p>
        </div>
      </section>

      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <h2>Our Mission</h2>
              <p>
                At CourseHub, we believe that quality education should be accessible to everyone, everywhere. 
                Our mission is to democratize learning by connecting students with world-class instructors and 
                providing a platform where knowledge knows no boundaries.
              </p>
            </div>
            <div className="vision-card">
              <h2>Our Vision</h2>
              <p>
                We envision a world where anyone, regardless of their background or location, can access 
                world-class education and transform their lives through learning. CourseHub aims to be the 
                leading platform that bridges the gap between learners and knowledge, fostering a global 
                community of lifelong learners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="features-grid">
            {features.map(feature => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">
                  <span className="icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
