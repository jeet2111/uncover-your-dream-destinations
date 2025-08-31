import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h3>Travel Guide</h3>
          <p>Your trusted companion for travel planning and guidance. Explore the world with confidence.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/destination">Destinations</Link></li>
            <li><Link to="/budget">Budget Planning</Link></li>
            <li><Link to="/counselling">Travel Counselling</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Travel Planning</li>
            <li>Budget Optimization</li>
            <li>Destination Guides</li>
            <li>Travel Tips</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>Email: info@travelguide.com</li>
            <li>Phone: +1 234 567 8900</li>
            <li>Address: 123 Travel Street</li>
            <li>City, State 12345</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 Travel Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;