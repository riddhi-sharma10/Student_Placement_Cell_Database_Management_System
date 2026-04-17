import pool from './db.js';
async function run() {
    try {
        const [records] = await pool.query(`
            SELECT s.s_name AS student,
                   COALESCE(s.dept, 'Unknown') AS department,
                   COALESCE(c.comp_name, '-') AS company,
                   COALESCE(j.package, 0) AS packageLpa,
                   a.status
            FROM APPLICATION a
            JOIN STUDENT s ON s.s_id = a.s_id
            LEFT JOIN JOB_PROFILE j ON j.job_id = a.job_id
            LEFT JOIN COMPANY c ON c.comp_id = j.comp_id
            ORDER BY a.applied_date DESC
            LIMIT 50
        `);
        console.log('Query successful, rows:', records.length);
    } catch(e) {
        console.error(e);
    }
    process.exit(0);
}
run();
