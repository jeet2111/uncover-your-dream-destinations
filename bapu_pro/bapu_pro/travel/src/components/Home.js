import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Chatbot from '../components/Chatbot';



function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content" data-aos="fade-up">
          <h1>Explore the World's Wonders</h1>
          <p className="hero-subtitle">Your premium travel companion for unforgettable journeys</p>
          <div className="hero-cta">
            <button className="primary-btn">Start Planning</button>
            <button className="secondary-btn">Watch Demo</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Travelers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
        <Chatbot />
      </div>

      <div className="featured-destinations">
        <h2 data-aos="fade-up">Popular Destinations</h2>
        <div className="destination-grid">
          {['Bali', 'Santorini', 'Maldives', 'Swiss Alps'].map((place, index) => (
            <div className="destination-card" data-aos="fade-up" data-aos-delay={index * 100} key={place}>
              <div className="destination-image" style={{backgroundColor: '#ddd'}}></div>
              <div className="destination-info">
                <h3>{place}</h3>
                <div className="destination-meta">
                  <span><i className="fas fa-star"></i> 4.8</span>
                  <span><i className="fas fa-map-marker-alt"></i> Location</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="services-section">
        <div className="service-content" data-aos="fade-right">
          <h2>Personalized Travel Experience</h2>
          <div className="services-grid">
            {[
              { icon: 'route', title: 'Custom Itineraries', desc: 'Tailored travel plans just for you' },
              { icon: 'hotel', title: 'Premium Stays', desc: 'Handpicked luxury accommodations' },
              { icon: 'user-shield', title: 'Travel Insurance', desc: 'Comprehensive coverage options' },
              { icon: 'compass', title: 'Local Guides', desc: 'Expert local knowledge' }
            ].map((service, index) => (
              <div className="service-card" key={service.title} data-aos="zoom-in" data-aos-delay={index * 100}>
                <i className={`fas fa-${service.icon}`}></i>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="experience-section">
        <div className="experience-content" data-aos="fade-up">
          <h2>How It Works</h2>
          <div className="timeline">
            {[
              { number: '01', title: 'Share Your Dreams', desc: 'Tell us your travel preferences' },
              { number: '02', title: 'Get Matched', desc: 'Connect with expert travel planners' },
              { number: '03', title: 'Plan Together', desc: 'Customize your perfect itinerary' },
              { number: '04', title: 'Travel Worry-Free', desc: 'Enjoy 24/7 travel support' }
            ].map((step, index) => (
              <div className="timeline-item" key={step.number} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="timeline-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-section" data-aos="fade-up">
        <div className="cta-content">
          <h2>Ready for Your Next Adventure?</h2>
          <p>Join thousands of happy travelers who found their perfect journey with us</p>
          <button className="primary-btn">Start Planning Now</button>
        </div>
      </div>
    </div>
    
  );
}

export default Home;