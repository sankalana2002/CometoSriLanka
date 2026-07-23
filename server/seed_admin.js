const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, 'database/users.db');
const db = new sqlite3.Database(dbPath);

async function seed() {
    const email = 'admin@gmail.com';
    const password = 'admin123';
    const name = 'System Admin';
    const role = 'admin';

    const hashedPassword = await bcrypt.hash(password, 10);

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) {
            console.error(err.message);
            return;
        }

        if (user) {
            console.log("Admin user already exists. Updating role and password...");
            db.run("UPDATE users SET password = ?, role = ? WHERE email = ?", [hashedPassword, role, email], (err) => {
                if (err) console.error(err.message);
                else console.log("Admin account updated successfully!");
                db.close();
            });
        } else {
            console.log("Creating new admin account...");
            db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, role], (err) => {
                if (err) console.error(err.message);
                else console.log("Admin account created successfully!");
                db.close();
            });
        }
    });
}

seed();
