const db = require('../database/db');

// @desc    Create a quote request
// @route   POST /api/quotes
// @access  Public
exports.createQuote = async (req, res) => {
    const { name, email, phone, destination, travelDate, travelers, message } = req.body;
    const userId = req.user ? req.user.id : null;

    // Basic Validation
    if (!name || !email || !destination) {
        return res.status(400).json({ success: false, error: 'Please provide name, email, and destination' });
    }

    const sql = `INSERT INTO quotes (user_id, name, email, phone, destination, travel_date, travelers, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [userId, name, email, phone, destination, travelDate, travelers, message];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('createQuote Error:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, data: { id: this.lastID, ...req.body, status: 'pending' } });
    });
};

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Private/Admin
exports.getQuotes = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    let sql = `SELECT * FROM quotes`;
    let params = [];

    // Filter by user if authenticated and not admin (assuming all users can see their own quotes for now)
    if (userId && req.user.role !== 'admin') {
        sql += ` WHERE user_id = ?`;
        params.push(userId);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
        res.status(200).json({ success: true, count: rows.length, data: rows });
    });
};
