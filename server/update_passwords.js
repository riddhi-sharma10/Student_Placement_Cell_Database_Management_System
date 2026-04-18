
import pool from './db.js';
async function update() {
    try {
        await pool.query("UPDATE USER_ROLE SET password_hash = 'stu@2024' WHERE role = 'student'");
        await pool.query("UPDATE USER_ROLE SET password_hash = 'co@2024' WHERE role = 'coordinator'");
        await pool.query("UPDATE USER_ROLE SET password_hash = 'adm@2024' WHERE role = 'cgdc_admin'");
        console.log('✅ Passwords successfully updated!');
    } catch(err) { console.error(err); }
    finally { process.exit(); }
}
update();
