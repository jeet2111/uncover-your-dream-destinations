import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext(null);

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check authentication status when component mounts
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (token, redirectPath = '/') => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        // Navigate to the page user was trying to access
        navigate(redirectPath);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            login, 
            logout,
            loading 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};