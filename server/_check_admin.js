import pool from './db.js';
const [rows] = await pool.query("SELECT username, password_hash, role FROM USER_ROLE WHERE role='admin' LIMIT 3");
console.log(JSON.stringify(rows, null, 2));
process.exit();
