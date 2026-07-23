const db = require('../database/db');

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
exports.getHotels = (req, res) => {
    db.all("SELECT * FROM hotels", [], (err, rows) => {
        if (err) {
            console.error('getHotels Error:', err);
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
        
        // Parse JSON strings back to arrays
        const parsedHotels = rows.map(hotel => ({
            ...hotel,
            pricePerNight: hotel.price_per_night, // map snake to camel case
            amenities: hotel.amenities ? JSON.parse(hotel.amenities) : [],
            images: hotel.images ? JSON.parse(hotel.images) : []
        }));

        res.status(200).json({ success: true, count: parsedHotels.length, data: parsedHotels });
    });
};

// @desc    Create a hotel
// @route   POST /api/hotels
// @access  Public
exports.createHotel = (req, res) => {
    const { name, location, description, pricePerNight, amenities, images, rating } = req.body;
    
    const sql = `INSERT INTO hotels (name, location, description, price_per_night, amenities, images, rating) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        name, 
        location, 
        description, 
        pricePerNight, 
        JSON.stringify(amenities || []), 
        JSON.stringify(images || []), 
        rating || 0
    ];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, data: { id: this.lastID, ...req.body } });
    });
};

// @desc    Delete a hotel
// @route   DELETE /api/hotels/:id
// @access  Private/Admin
exports.deleteHotel = (req, res) => {
    db.run("DELETE FROM hotels WHERE id = ?", [req.params.id], function(err) {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        res.status(200).json({ success: true, message: 'Hotel deleted' });
    });
};
