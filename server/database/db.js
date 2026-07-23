const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbPath = path.resolve(__dirname, 'users.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table ' + err.message);
            }
        });

        // Create Bookings Table
        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            hotel_id INTEGER,
            hotel_name TEXT,
            guest_name TEXT,
            email TEXT,
            check_in TEXT,
            check_out TEXT,
            guests INTEGER,
            total_price REAL,
            status TEXT DEFAULT 'confirmed',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);

        // Create Reviews Table
        db.run(`CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            hotel_id INTEGER,
            rating INTEGER,
            comment TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);

        // Create Quotes Table
        db.run(`CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT,
            email TEXT,
            phone TEXT,
            destination TEXT,
            travel_date TEXT,
            travelers INTEGER,
            message TEXT,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);

        // Create Feedbacks Table
        db.run(`CREATE TABLE IF NOT EXISTS feedbacks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            rating INTEGER,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Create Restaurants Table
        db.run(`CREATE TABLE IF NOT EXISTS restaurants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            location TEXT,
            description TEXT,
            price TEXT,
            tags TEXT,
            image TEXT,
            rating REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (!err) {
                db.get("SELECT COUNT(*) AS count FROM restaurants", (err, row) => {
                    if (row && row.count === 0) {
                        const stmt = db.prepare("INSERT INTO restaurants (name, location, description, price, tags, image, rating) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        const initialRestaurants = [
                            { name: 'Ocean Sands Seafood', location: 'Unawatuna, Sri Lanka', description: 'Fresh catch of the day served right on the beach. Enjoy the tropical romantic dining vibe at sunset.', price: '$$$', tags: JSON.stringify(['Seafood', 'Beachfront', 'Romantic']), image: '/images/restaurant_1.png', rating: 4.8 },
                            { name: 'The View Fine Dining', location: 'Kandy, Sri Lanka', description: 'Elegant dining overlooking the misty mountains of Kandy. Exquisite luxury interior and world-class cuisine.', price: '$$$$', tags: JSON.stringify(['Fine Dining', 'Hill Country', 'Luxury']), image: '/images/restaurant_2.png', rating: 4.9 }
                        ];
                        initialRestaurants.forEach(r => {
                            stmt.run([r.name, r.location, r.description, r.price, r.tags, r.image, r.rating]);
                        });
                        stmt.finalize();
                    }
                });
            }
        });

        // Create Hotels Table and Seed Data
        db.run(`CREATE TABLE IF NOT EXISTS hotels (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            location TEXT,
            description TEXT,
            price_per_night REAL,
            amenities TEXT,
            images TEXT,
            rating REAL,
            availability BOOLEAN DEFAULT 1
        )`, (err) => {
            if (!err) {
                // Seed if empty
                db.get("SELECT COUNT(*) AS count FROM hotels", (err, row) => {
                    if (row && row.count === 0) {
                        console.log("Seeding initial hotels data...");
                        const stmt = db.prepare("INSERT INTO hotels (name, location, description, price_per_night, amenities, images, rating) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        const initialHotels = [
                            { name: "Grand Hotel", location: "Colombo", description: "A historic luxury hotel in the heart of the city.", pricePerNight: 200, amenities: JSON.stringify(["Pool", "Spa", "Gym"]), images: JSON.stringify(["/images/luxury_hotel_1_1776016177783.png"]), rating: 4.5 },
                            { name: "Beach Resort", location: "Galle", description: "Relax by the ocean in this beautiful resort.", pricePerNight: 150, amenities: JSON.stringify(["Beach Access", "Pool", "Bar"]), images: JSON.stringify(["/images/boutique_hotel_2_1776016197475.png"]), rating: 4.8 },
                            { name: "Cinnamon Citadel", location: "Kandy", description: "Luxury by the Mahaweli river.", pricePerNight: 180, amenities: JSON.stringify(["River View", "Pool", "Fine Dining"]), images: JSON.stringify(["/images/beach_villa_3_1776016220894.png"]), rating: 4.6 }
                        ];
                        initialHotels.forEach(h => {
                            stmt.run([h.name, h.location, h.description, h.pricePerNight, h.amenities, h.images, h.rating]);
                        });
                        stmt.finalize();
                    }
                });
            }
        });
    }
});

module.exports = db;
