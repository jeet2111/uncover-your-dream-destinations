import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Feedback.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverStatus, setServerStatus] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Check server connection on component mount
    useEffect(() => {
        const checkServer = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/feedback/test');
                const data = await response.json();
                if (data.message) {
                    setServerStatus(true);
                }
            } catch (error) {
                console.error('Server check failed:', error);
                setServerStatus(false);
            }
        };

        checkServer();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if (!isAuthenticated) {
            setMessage('Please login to submit feedback');
            navigate('/login');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setMessage('Authentication token not found. Please login again.');
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    feedback,
                    rating: parseInt(rating)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit feedback');
            }

            const data = await response.json();
            setMessage('Feedback submitted successfully!');
            setFeedback('');
            setRating(5);
            
        } catch (error) {
            console.error('Feedback submission error:', error);
            setMessage(error.message || 'Error submitting feedback. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!serverStatus) {
        return (
            <div className="feedback-container">
                <div className="alert alert-warning">
                    Checking server connection... Please wait.
                </div>
            </div>
        );
    }

    return (
        <div className="feedback-container">
            <h2>Share Your Feedback</h2>
            {message && (
                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label>Rating:</label>
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Your Feedback:</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="form-control"
                        rows="5"
                        required
                        placeholder="Please share your experience..."
                        minLength="10"
                        maxLength="500"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading || !feedback.trim()}
                >
                    {isLoading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-3">
                    <small className="text-muted">
                        Server Status: {serverStatus ? 'Connected' : 'Not Connected'}
                    </small>
                </div>
            )}
        </div>
    );
};

export default Feedback;