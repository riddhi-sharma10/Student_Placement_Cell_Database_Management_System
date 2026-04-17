
import pool from './db.js';
async function update() {
    try {
        await pool.query("UPDATE JOB_PROFILE SET job_type = 'Full Time'");
        console.log('✅ All job profiles updated to Full Time.');
    } catch(err) { console.error(err); }
    finally { process.exit(); }
}
update();
