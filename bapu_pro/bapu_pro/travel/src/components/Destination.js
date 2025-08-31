import { useState, useEffect } from 'react';
import AOS from 'aos';
 import 'aos/dist/aos.css';
import '../styles/destination.css';
function Destinations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const destinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      category: "europe",
      rating: 4.9,
      price: "1,500",
      duration: "7 days",
      image: "santorini.jpg", // Add your image path
      description: "White-washed buildings, blue domes, and stunning sunsets",
      highlights: ["Sunset in Oia", "Wine Tasting", "Beach Tours"]
    },
    {
      id: 2,
      name: "Bali, Indonesia",
      category: "asia",
      rating: 4.8,
      price: "1,200",
      duration: "10 days",
      image: "bali.jpg", // Add your image path
      description: "Tropical paradise with rich culture and beautiful beaches",
      highlights: ["Temple Visit", "Rice Terraces", "Surf Lessons"]
    },
    // Add more destinations as needed
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = activeFilter === 'all' || dest.category === activeFilter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <div className="hero-content" data-aos="fade-up">
          <h1>Discover Amazing Places</h1>
          <p>Explore our handpicked destinations around the world</p>
        </div>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button 
          className="filter-toggle"
          onClick={() => setShowFilter(!showFilter)}
        >
          <i className="fas fa-filter"></i> Filter
        </button>

        <div className={`filter-options ${showFilter ? 'show' : ''}`}>
          {['all', 'asia', 'europe', 'americas', 'africa'].map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map((dest, index) => (
          <div 
            className="destination-card" 
            key={dest.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="card-image">
              <img src={dest.image} alt={dest.name} />
              <div className="card-price">${dest.price}</div>
              <div className="card-duration">{dest.duration}</div>
            </div>
            <div className="card-content">
              <h3>{dest.name}</h3>
              <div className="card-meta">
                <span className="rating">
                  <i className="fas fa-star"></i> {dest.rating}
                </span>
                <span className="category">
                  <i className="fas fa-map-marker-alt"></i> {dest.category}
                </span>
              </div>
              <p>{dest.description}</p>
              <div className="highlights">
                {dest.highlights.map(highlight => (
                  <span key={highlight} className="highlight-tag">
                    {highlight}
                  </span>
                ))}
              </div>
              <button className="explore-btn">Explore More</button>
            </div>
          </div>
        ))}
      </div>

      <div className="newsletter-section" data-aos="fade-up">
        <h2>Get Travel Updates</h2>
        <p>Subscribe to our newsletter for exclusive deals and travel tips</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Destinations;