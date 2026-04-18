import pool from './db.js';

async function testAll() {
    try {
        console.log('Testing /users');
        const [users] = await pool.query(`
            SELECT
                u.user_id AS id,
                COALESCE(s.s_name, a.name, u.username) AS name,
                u.username,
                COALESCE(s.email, CONCAT(u.username, '@university.edu')) AS email,
                CASE WHEN u.role = 'student' THEN COALESCE(s.dept, '') ELSE '' END AS branch,
                CASE WHEN u.role = 'student' THEN CONCAT('ST-', LPAD(COALESCE(s.s_id, u.entity_id, 0), 4, '0')) ELSE COALESCE(CAST(u.entity_id AS CHAR), '') END AS entityId,
                CASE WHEN u.role = 'student' THEN COALESCE(s.profile_status, 'Active') ELSE 'Active' END AS status,
                CASE WHEN u.role = 'student' THEN 'Standard' ELSE 'Elevated' END AS permission,
                u.role,
                0 AS lastLoginDays
            FROM USER_ROLE u
            LEFT JOIN STUDENT s ON u.role = 'student' AND s.s_id = u.entity_id
            LEFT JOIN CGDC_ADMIN a ON u.role IN ('coordinator','admin','cgdc_admin') AND a.cgdc_id = u.entity_id
        `);
        console.log('users ok', users.length);

        console.log('Testing /companies');
        const [companies] = await pool.query(`
            SELECT c.comp_id AS id, c.comp_name, COALESCE(c.industry_type,'N/A') AS industry, COALESCE(c.tier,'Unknown') AS tier, 'active' AS status, COUNT(DISTINCT j.job_id) AS activeJobs, COALESCE(SUM(CASE WHEN a.status IN ('selected') THEN 1 ELSE 0 END), 0) AS placements, COUNT(DISTINCT j.job_id) AS positionsCount
            FROM COMPANY c
            LEFT JOIN JOB_PROFILE j ON j.comp_id = c.comp_id
            LEFT JOIN APPLICATION a ON a.job_id = j.job_id
            GROUP BY c.comp_id, c.comp_name, c.industry_type, c.tier, 'active'
            ORDER BY c.comp_name ASC
        `);
        console.log('companies ok', companies.length);

        console.log('Testing /records');
        const [records] = await pool.query(`
            SELECT a.app_id AS id, s.s_name AS student, COALESCE(s.dept, 'Unknown') AS department, COALESCE(c.comp_name, '-') AS company, COALESCE(j.package, 0) AS packageLpa, COALESCE(a.status, 'Applied') AS status, YEAR(a.applied_date) AS appliedYear
            FROM APPLICATION a
            JOIN STUDENT s ON s.s_id = a.s_id
            LEFT JOIN JOB_PROFILE j ON j.job_id = a.job_id
            LEFT JOIN COMPANY c ON c.comp_id = j.comp_id
            ORDER BY a.applied_date DESC
        `);
        console.log('records ok', records.length);

        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
testAll();
