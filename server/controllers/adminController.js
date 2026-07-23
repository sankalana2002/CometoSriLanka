const db = require('../database/db');

// @desc    Get all data for admin dashboard
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardData = (req, res) => {
    const data = {};

    // Fetch all bookings
    db.all(`SELECT * FROM bookings ORDER BY created_at DESC`, [], (err, bookings) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        data.bookings = bookings;

        // Fetch all quotes
        db.all(`SELECT * FROM quotes ORDER BY created_at DESC`, [], (err, quotes) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            data.quotes = quotes;

            // Fetch all feedbacks
            db.all(`SELECT * FROM feedbacks ORDER BY created_at DESC`, [], (err, feedbacks) => {
                if (err) return res.status(500).json({ success: false, error: err.message });
                data.feedbacks = feedbacks;

                // Fetch all users
                db.all(`SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC`, [], (err, users) => {
                    if (err) return res.status(500).json({ success: false, error: err.message });
                    data.users = users;

                    // Fetch all hotels
                    db.all(`SELECT * FROM hotels ORDER BY id DESC`, [], (err, hotels) => {
                        if (err) return res.status(500).json({ success: false, error: err.message });
                        data.hotels = hotels.map(h => ({ 
                            ...h, 
                            amenities: JSON.parse(h.amenities || '[]'),
                            images: JSON.parse(h.images || '[]') 
                        }));

                        // Fetch all restaurants
                        db.all(`SELECT * FROM restaurants ORDER BY id DESC`, [], (err, restaurants) => {
                            if (err) return res.status(500).json({ success: false, error: err.message });
                            data.restaurants = restaurants.map(r => ({ ...r, tags: JSON.parse(r.tags || '[]') }));

                            res.status(200).json({ success: true, data });
                        });
                    });
                });
            });
        });
    });
};
