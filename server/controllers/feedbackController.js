const db = require('../database/db');

exports.createFeedback = (req, res) => {
    const { name, email, rating, message } = req.body;
    
    if (!name || !email || !rating || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `INSERT INTO feedbacks (name, email, rating, message) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, email, rating, message], function(err) {
        if (err) {
            console.error('Database Error:', err.message);
            return res.status(500).json({ error: 'Failed to submit feedback.' });
        }
        res.status(201).json({ success: true, message: 'Feedback submitted successfully.', feedbackId: this.lastID });
    });
};

exports.getFeedbacks = (req, res) => {
    const query = `SELECT * FROM feedbacks ORDER BY created_at DESC LIMIT 50`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Database Error:', err.message);
            return res.status(500).json({ error: 'Failed to fetch feedbacks.' });
        }
        res.status(200).json({ success: true, feedbacks: rows });
    });
};
