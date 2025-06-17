import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Little Lemon</h3>
            <p>Mediterranean Cuisine</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>📍 123 Mediterranean Ave</p>
            <p>📞 (555) 123-4567</p>
            <p>✉️ info@littlelemon.com</p>
          </div>

          <div className="footer-section">
            <h4>Hours</h4>
            <p>Mon-Fri: 11:00 AM - 10:00 PM</p>
            <p>Sat-Sun: 10:00 AM - 11:00 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Little Lemon</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
