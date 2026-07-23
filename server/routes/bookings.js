const express = require('express');
const router = express.Router();
const { createBooking, getBookings, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBookings).post(protect, createBooking);
router.route('/:id').delete(protect, deleteBooking);

module.exports = router;
