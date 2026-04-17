// server/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); // project root .env
dotenv.config(); // fallback to server/.env if present

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection when server starts
pool.getConnection()
    .then(conn => {
        console.log('✅ MySQL connected successfully!');
        conn.release(); // return it to the pool
    })
    .catch(err => {
        console.error('❌ MySQL connection failed:', err.message);
    });

export default pool;
