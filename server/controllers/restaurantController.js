const db = require('../database/db');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
exports.getRestaurants = (req, res) => {
    db.all("SELECT * FROM restaurants", [], (err, rows) => {
        if (err) {
            console.error('getRestaurants Error:', err);
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
        
        const parsedRestaurants = rows.map(rest => ({
            ...rest,
            tags: rest.tags ? JSON.parse(rest.tags) : []
        }));

        res.status(200).json({ success: true, count: parsedRestaurants.length, data: parsedRestaurants });
    });
};

// @desc    Create a restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
exports.createRestaurant = (req, res) => {
    const { name, location, description, price, tags, image, rating } = req.body;
    
    const sql = `INSERT INTO restaurants (name, location, description, price, tags, image, rating) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        name, 
        location, 
        description, 
        price, 
        JSON.stringify(tags || []), 
        image, 
        rating || 0
    ];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, data: { id: this.lastID, ...req.body } });
    });
};

// @desc    Delete a restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
exports.deleteRestaurant = (req, res) => {
    db.run("DELETE FROM restaurants WHERE id = ?", [req.params.id], function(err) {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        res.status(200).json({ success: true, message: 'Restaurant deleted' });
    });
};
