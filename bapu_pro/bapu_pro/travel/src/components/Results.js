import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/results.css';

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const predictions = location.state?.predictions || [];

    return (
        <div className="results-container">
            <div className="results-header">
                <h1>Your Career Recommendations</h1>
                <p>Based on your skills, interests, and academic performance</p>
            </div>

            <div className="careers-grid">
                {predictions.map((career, index) => {
                    // Split the career string to separate name and match percentage
                    const [careerName, matchInfo] = career.split('(');
                    const matchPercentage = matchInfo ? matchInfo.replace('Match: ', '').replace(')', '') : null;

                    return (
                        <div key={index} className="career-card">
                            <div className="career-card-content">
                                <span className="career-number">{index + 1}</span>
                                <h3>{careerName}</h3>
                                {matchPercentage && (
                                    <div className="match-percentage">
                                        <div className="percentage-bar">
                                            <div 
                                                className="percentage-fill"
                                                style={{ width: matchPercentage }}
                                            ></div>
                                        </div>
                                        <span className="percentage-text">{matchPercentage} Match</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="action-buttons">
                <button 
                    className="secondary-button"
                    onClick={() => navigate('/counselling')}
                >
                    Try Again
                </button>
                <button 
                    className="primary-button"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default Results;