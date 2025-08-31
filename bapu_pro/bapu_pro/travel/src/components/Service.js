import React from 'react';
import '../styles/styles.css';

function Services() {
  return (
    <div className="services-container container mt-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="service-card">
            <h3>Career Assessment</h3>
            <p>Take our comprehensive career assessment test to understand your interests and aptitude.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="service-card">
            <h3>One-on-One Counselling</h3>
            <p>Get personalized guidance from our expert career counselors.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="service-card">
            <h3>Resume Building</h3>
            <p>Create a professional resume that stands out.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="service-card">
            <h3>Interview Preparation</h3>
            <p>Master the art of interviewing with our expert tips.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;