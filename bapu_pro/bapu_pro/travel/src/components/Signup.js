import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import '../styles/auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            if (response.ok) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed!');
            }
        } catch (error) {
            alert('Registration failed! Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Sign up for an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="auth-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;