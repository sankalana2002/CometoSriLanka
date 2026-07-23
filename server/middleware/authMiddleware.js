const jwt = require('jsonwebtoken');
const db = require('../database/db');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

            // Get user from the token
            const sql = `SELECT id, name, email, role FROM users WHERE id = ?`;
            db.get(sql, [decoded.id], (err, user) => {
                if (err) {
                    return res.status(500).json({ success: false, error: 'Server Error' });
                }
                if (!user) {
                    return res.status(401).json({ success: false, error: 'Not authorized' });
                }
                req.user = user;
                next();
            });
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, error: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, error: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, error: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
