const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

// Submit feedback
router.post('/', auth, async (req, res) => {
    try {
        console.log('Received feedback request:', req.body); // Debug log
        console.log('User from token:', req.user); // Debug log

        const { feedback, rating } = req.body;
        
        if (!feedback || !rating) {
            return res.status(400).json({
                success: false,
                message: 'Feedback and rating are required'
            });
        }

        const newFeedback = await Feedback.create({
            user: req.user.id,
            feedback,
            rating
        });

        console.log('Feedback created:', newFeedback); // Debug log

        res.status(201).json({
            success: true,
            data: newFeedback,
            message: 'Feedback submitted successfully'
        });
    } catch (error) {
        console.error('Server error in feedback submission:', error); // Debug log
        res.status(500).json({ 
            success: false,
            message: 'Error submitting feedback',
            error: error.message 
        });
    }
});

// Get all feedbacks
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            data: feedbacks
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error fetching feedbacks',
            error: error.message 
        });
    }
});

module.exports = router;