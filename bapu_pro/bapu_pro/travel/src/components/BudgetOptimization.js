import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/budgetOptimization.css';

function BudgetOptimization() {
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('7');
  const [travelers, setTravelers] = useState('2');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const destinations = [
    { id: 1, name: 'Europe', icon: '🏰' },
    { id: 2, name: 'Asia', icon: '🗼' },
    { id: 3, name: 'North America', icon: '🗽' },
    { id: 4, name: 'South America', icon: '🗿' },
    { id: 5, name: 'Africa', icon: '🐘' },
    { id: 6, name: 'Australia', icon: '🦘' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="budget-page">
      <div className="budget-hero">
        <div className="hero-content" data-aos="fade-up">
          <h1>Smart Travel Budget Planner</h1>
          <p>Optimize your travel budget for the perfect adventure</p>
        </div>
      </div>

      <div className="budget-container">
        <div className="budget-calculator" data-aos="fade-right">
          <h2>Plan Your Budget</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Total Budget (USD)</label>
              <div className="currency-input">
                <span>$</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter your budget"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Duration (Days)</label>
              <div className="range-slider">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <span>{duration} days</span>
              </div>
            </div>

            <div className="input-group">
              <label>Number of Travelers</label>
              <div className="traveler-selector">
                <button type="button" onClick={() => setTravelers(prev => Math.max(1, +prev - 1))}>-</button>
                <span>{travelers}</span>
                <button type="button" onClick={() => setTravelers(prev => +prev + 1)}>+</button>
              </div>
            </div>

            <div className="input-group">
              <label>Select Destination</label>
              <div className="destination-selector">
                {destinations.map(dest => (
                  <button
                    key={dest.id}
                    type="button"
                    className={`destination-btn ${selectedDestination === dest.name ? 'active' : ''}`}
                    onClick={() => setSelectedDestination(dest.name)}
                  >
                    <span className="dest-icon">{dest.icon}</span>
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="calculate-btn">
              Calculate Budget Breakdown
            </button>
          </form>
        </div>

        {showResults && (
          <div className="budget-results" data-aos="fade-left">
            <h2>Budget Breakdown</h2>
            <div className="breakdown-cards">
              <div className="breakdown-card">
                <div className="card-header">
                  <i className="fas fa-bed"></i>
                  <h3>Accommodation</h3>
                </div>
                <div className="card-amount">${Math.round(budget * 0.4)}</div>
                <div className="card-percent">40%</div>
                <div className="progress-bar">
                  <div className="progress" style={{width: '40%'}}></div>
                </div>
              </div>

              <div className="breakdown-card">
                <div className="card-header">
                  <i className="fas fa-plane"></i>
                  <h3>Transportation</h3>
                </div>
                <div className="card-amount">${Math.round(budget * 0.3)}</div>
                <div className="card-percent">30%</div>
                <div className="progress-bar">
                  <div className="progress" style={{width: '30%'}}></div>
                </div>
              </div>

              <div className="breakdown-card">
                <div className="card-header">
                  <i className="fas fa-utensils"></i>
                  <h3>Food & Dining</h3>
                </div>
                <div className="card-amount">${Math.round(budget * 0.2)}</div>
                <div className="card-percent">20%</div>
                <div className="progress-bar">
                  <div className="progress" style={{width: '20%'}}></div>
                </div>
              </div>

              <div className="breakdown-card">
                <div className="card-header">
                  <i className="fas fa-ticket-alt"></i>
                  <h3>Activities</h3>
                </div>
                <div className="card-amount">${Math.round(budget * 0.1)}</div>
                <div className="card-percent">10%</div>
                <div className="progress-bar">
                  <div className="progress" style={{width: '10%'}}></div>
                </div>
              </div>
            </div>

            <div className="daily-budget">
              <h3>Estimated Daily Budget per Person</h3>
              <div className="daily-amount">
                ${Math.round(budget / duration / travelers)}
                <span>/day</span>
              </div>
            </div>

            <div className="budget-tips">
              <h3>Travel Tips</h3>
              <ul>
                <li>Book accommodations in advance for better rates</li>
                <li>Consider local transportation passes for savings</li>
                <li>Look for free walking tours and attractions</li>
                <li>Try local street food for authentic and budget-friendly meals</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetOptimization;