const express = require('express');
const router = express.Router();
const { createQuote, getQuotes } = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');

// Add optional protection or role-based check if needed
router.route('/').get(protect, getQuotes).post(createQuote);

module.exports = router;
