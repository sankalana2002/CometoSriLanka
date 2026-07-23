const db = require('../database/db');
// Mock Data Removed

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
    // console.log('createBooking called with:', req.body);
    const { hotelId, hotelName, guestName, email, checkIn, checkOut, guests, totalPrice } = req.body;
    const userId = req.user ? req.user.id : null;

    // Basic Validation
    if (!hotelId || !checkIn || !checkOut || !guestName) {
        return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }

    const sql = `INSERT INTO bookings (user_id, hotel_id, hotel_name, guest_name, email, check_in, check_out, guests, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [userId, hotelId, hotelName, guestName, email, checkIn, checkOut, guests, totalPrice];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('createBooking Error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, data: { id: this.lastID, ...req.body, status: 'confirmed' } });
    });
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
exports.getBookings = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    let sql = `SELECT * FROM bookings`;
    let params = [];

    // If authenticated, only show my bookings? Or assume this is an admin route? 
    // For now, let's just return all for simplicity or filter by user if present
    if (userId) {
        sql += ` WHERE user_id = ?`;
        params.push(userId);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
        // Ensure status field exists for frontend
        const result = rows.map(b => ({
            ...b,
            status: b.status || 'confirmed'
        }));
        res.status(200).json({ success: true, count: result.length, data: result });
    });
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // First check if booking exists and belongs to user (unless admin)
    db.get(`SELECT user_id FROM bookings WHERE id = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        if (!row) return res.status(404).json({ success: false, error: 'Booking not found' });

        if (row.user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to delete this booking' });
        }

        db.run(`DELETE FROM bookings WHERE id = ?`, [id], (err) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.status(200).json({ success: true, message: 'Booking removed' });
        });
    });
};
