import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Little Lemon</h1>
        <p>Book your table for an amazing dining experience</p>
        <a href="#booking" className="btn">Book Now</a>
      </div>
    </section>
  );
};

export default Hero;
