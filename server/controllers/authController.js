const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide all fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        db.run(sql, [name, email, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ success: false, error: 'Email already exists' });
                }
                return res.status(500).json({ success: false, error: err.message });
            }

            const token = jwt.sign({ id: this.lastID, role: 'user' }, process.env.JWT_SECRET || 'secret', {
                expiresIn: '30d'
            });

            res.status(201).json({
                success: true,
                token,
                user: { id: this.lastID, name, email, role: 'user' }
            });
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Server Error' });
        }
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '30d'
        });

        res.status(200).json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
    res.status(200).json({ success: true, data: req.user });
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.user.id;

    // Build query dynamically based on provided fields
    let sql = "UPDATE users SET ";
    const params = [];
    const updates = [];

    if (name) {
        updates.push("name = ?");
        params.push(name);
    }
    if (email) {
        updates.push("email = ?");
        params.push(email);
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.push("password = ?");
        params.push(hashedPassword);
    }

    if (updates.length === 0) {
        return res.status(400).json({ success: false, error: "No fields to update" });
    }

    sql += updates.join(", ") + " WHERE id = ?";
    params.push(userId);

    db.run(sql, params, function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ success: false, error: 'Email already exists' });
            }
            return res.status(500).json({ success: false, error: err.message });
        }

        // Fetch updated user to return
        db.get("SELECT id, name, email, role FROM users WHERE id = ?", [userId], (err, user) => {
            if (err) return res.status(500).json({ success: false, error: "Error fetching updated user" });
            res.status(200).json({ success: true, data: user });
        });
    });
};
