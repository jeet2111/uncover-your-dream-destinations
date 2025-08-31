const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Test API route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Feedback test route
app.get('/api/feedback/test', (req, res) => {
    res.json({ message: 'Feedback endpoint is working!' });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Use routes with explicit paths
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Something went wrong!',
        error: err.message 
    });
});

// 404 handler - must be last
app.use('*', (req, res) => {
    console.log('404 - Route not found:', req.originalUrl);
    res.status(404).json({ 
        success: false,
        message: 'Route not found' 
    });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available routes:');
    console.log(`- http://localhost:${PORT}/`);
    console.log(`- http://localhost:${PORT}/api/test`);
    console.log(`- http://localhost:${PORT}/api/feedback/test`);
});