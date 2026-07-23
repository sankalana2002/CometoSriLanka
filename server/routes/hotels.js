const express = require('express');
const router = express.Router();
const { getHotels, createHotel } = require('../controllers/hotelController');
console.log('Hotel Controller Imports:', { getHotels, createHotel });

router.route('/')
    .get(getHotels)
    .post(createHotel);

module.exports = router;
