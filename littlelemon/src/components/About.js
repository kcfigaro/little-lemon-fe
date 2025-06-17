import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Our Story</h2>
            <p className="about-description">
              Little Lemon was founded in 2010 with a simple mission: to bring the authentic
              flavors of the Mediterranean to our community. Our family recipes have been
              passed down through generations, and we take pride in serving dishes that
              capture the essence of Mediterranean cuisine.
            </p>
            <p className="about-description">
              We source the finest ingredients from local suppliers and use traditional
              cooking methods to create memorable dining experiences. Every dish tells a
              story of heritage, passion, and love for food.
            </p>
          </div>
          <div className="about-features">
            <div className="feature">
              <div className="feature-icon">🌿</div>
              <h3>Fresh Ingredients</h3>
              <p>Locally sourced, organic ingredients</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>Experienced Mediterranean cuisine specialists</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏺</div>
              <h3>Traditional Recipes</h3>
              <p>Authentic family recipes passed down through generations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
