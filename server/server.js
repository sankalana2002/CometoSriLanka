require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Request logging middleware
app.use((req, res, next) => {
    console.error(`${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection (Mock)
console.log('Running with In-Memory Mock Database');
// mongoose.connect(process.env.MONGO_URI)... skipped for now

// Routes
app.get('/', (req, res) => {
    res.send('Come to Sri Lanka API is running');
});

// Import Routes
const hotelRoutes = require('./routes/hotels');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quotes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminRoutes = require('./routes/adminRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/restaurants', restaurantRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
