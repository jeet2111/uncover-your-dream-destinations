import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Counselling from './components/Counselling';
import Results from './components/Results';
import Login from './components/Login';
import Signup from './components/Signup';
import Destinations from './components/Destination';
import BudgetOptimization from './components/BudgetOptimization';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import './styles/destination.css';
import './styles/budgetOptimization.css';
import Chatbot from './components/Chatbot';
import Feedback from './components/Feedback';

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="App">
            <Navbar />
            <div className="main-content">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected routes */}
                    <Route 
                        path="/counselling" 
                        element={
                            <ProtectedRoute>
                                <Counselling />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/results" 
                        element={
                            <ProtectedRoute>
                                <Results />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/destination" 
                        element={
                            <ProtectedRoute>
                                <Destinations />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/budget" 
                        element={
                            <ProtectedRoute>
                                <BudgetOptimization />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/feedback" 
                        element={
                            <ProtectedRoute>
                                <Feedback />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* Catch-all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;