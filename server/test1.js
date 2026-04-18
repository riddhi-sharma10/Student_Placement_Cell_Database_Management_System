import pool from './db.js';

async function run() {
    const [records] = await pool.query(`
        SELECT s.s_name AS student,
               COALESCE(s.dept, 'Unknown') AS department,
               COALESCE(c.name, '-') AS company,
               COALESCE(j.package_lpa, 0) AS packageLpa,
               a.status
        FROM APPLICATION a
        JOIN STUDENT s ON s.s_id = a.s_id
        LEFT JOIN JOB_PROFILE j ON j.job_id = a.job_id
        LEFT JOIN COMPANY c ON c.comp_id = j.comp_id
        ORDER BY a.applied_date DESC
        LIMIT 5
    `);
    console.log(records);
    process.exit(0);
}

run();