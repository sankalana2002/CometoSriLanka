const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Submit new feedback
router.post('/', feedbackController.createFeedback);

// Get feedbacks
router.get('/', feedbackController.getFeedbacks);

module.exports = router;
