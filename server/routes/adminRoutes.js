const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/adminController');
const { createHotel, deleteHotel } = require('../controllers/hotelController');
const { createRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, admin, getDashboardData);

// Inventory Management
router.post('/hotels', protect, admin, createHotel);
router.delete('/hotels/:id', protect, admin, deleteHotel);
router.post('/restaurants', protect, admin, createRestaurant);
router.delete('/restaurants/:id', protect, admin, deleteRestaurant);

module.exports = router;
