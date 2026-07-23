const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'server/database/users.db');
const db = new sqlite3.Database(dbPath);

db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log(JSON.stringify(rows, null, 2));
    db.close();
});
