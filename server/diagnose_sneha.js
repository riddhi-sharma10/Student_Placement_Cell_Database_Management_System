
import pool from './db.js';

async function diagnose() {
    try {
        const id = 1; // Sneha Patil
        console.log(`Checking data for Coord ID: ${id}`);
        
        // 1. Check raw students
        const [students] = await pool.query("SELECT s_id, s_name FROM STUDENT WHERE coord_id = ?", [id]);
        console.log(`- Students found: ${students.length}`);
        
        if (students.length > 0) {
            const sIds = students.map(s => s.s_id);
            console.log(`- First few student IDs: ${sIds.slice(0, 5).join(', ')}`);
            
            // 2. Check raw applications for these students
            const [apps] = await pool.query("SELECT COUNT(*) as count FROM APPLICATION WHERE s_id IN (?)", [sIds]);
            console.log(`- Applications found for these students: ${apps[0].count}`);
            
            // 3. Try the full chart join
            const [rows] = await pool.query(`
                SELECT c.comp_name, COUNT(*) as count
                FROM APPLICATION a
                JOIN STUDENT s ON a.s_id = s.s_id
                JOIN JOB_PROFILE j ON a.job_id = j.job_id
                JOIN COMPANY c ON j.comp_id = c.comp_id
                WHERE s.coord_id = ?
                GROUP BY c.comp_name
            `, [id]);
            console.log('- Chart Rows returned:', rows);
        }
    } catch (err) {
        console.error('DIAGNOSE ERROR:', err);
    } finally {
        await pool.end();
    }
}
diagnose();
