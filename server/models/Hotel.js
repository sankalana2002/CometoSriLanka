const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: []
    },
    rating: {
        type: Number,
        default: 0
    },
    contactInfo: {
        phone: String,
        email: String,
        website: String
    },
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', HotelSchema);
