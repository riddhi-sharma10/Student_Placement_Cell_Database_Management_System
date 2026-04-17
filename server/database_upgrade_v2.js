
import pool from './db.js';

async function performUpgrade() {
    try {
        console.log('🚀 Synchronized Database Transformation...');

        const columnExists = async (table, column) => {
            const [cols] = await pool.query(`SHOW COLUMNS FROM ${table} LIKE '${column}'`);
            return cols.length > 0;
        };

        // 1. Departments
        await pool.query('CREATE TABLE IF NOT EXISTS DEPARTMENT (dept_id INT AUTO_INCREMENT PRIMARY KEY, dept_name VARCHAR(100) UNIQUE)');
        const depts = ["Information Technology", "Computer Science", "Mechanical Engineering", "Electronics and Communication", "Civil Engineering"];
        for (const d of depts) {
            await pool.query('INSERT IGNORE INTO DEPARTMENT (dept_name) VALUES (?)', [d]);
        }
        await pool.query(`UPDATE PLACEMENT_COORDINATOR SET dept = CASE 
            WHEN dept LIKE '%IT%' THEN 'Information Technology' 
            WHEN dept LIKE '%Comp%' THEN 'Computer Science' 
            WHEN dept LIKE '%Mech%' THEN 'Mechanical Engineering' 
            WHEN dept LIKE '%Elect%' THEN 'Electronics and Communication' 
            WHEN dept LIKE '%Civil%' THEN 'Civil Engineering' 
            ELSE dept END`);

        // 2. Company
        if (await columnExists('COMPANY', 'avg_package_offered')) {
            await pool.query('UPDATE COMPANY SET avg_package_offered = ROUND(5.5 + (RAND() * 25), 2)');
        }

        // 3. Visit History Normalization
        if (await columnExists('COMPANY_VISIT_HISTORY', 'streams_covered')) {
            await pool.query('CREATE TABLE IF NOT EXISTS VISIT_COVERED_STREAM (visit_id INT, stream_name VARCHAR(100), PRIMARY KEY(visit_id, stream_name), FOREIGN KEY (visit_id) REFERENCES COMPANY_VISIT_HISTORY(visit_id))');
            await pool.query(`
                INSERT IGNORE INTO VISIT_COVERED_STREAM (visit_id, stream_name)
                SELECT visit_id, TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(REPLACE(streams_covered, ', ', ','), ',', n.n), ',', -1))
                FROM COMPANY_VISIT_HISTORY CROSS JOIN (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) n
                WHERE n.n <= 1 + (LENGTH(streams_covered) - LENGTH(REPLACE(streams_covered, ',', '')))
            `);
            await pool.query('ALTER TABLE COMPANY_VISIT_HISTORY DROP COLUMN streams_covered');
        }

        // 4. Interview Cleanup
        if (await columnExists('INTERVIEW', 'remarks')) {
            await pool.query('ALTER TABLE INTERVIEW DROP COLUMN remarks');
        }

        // 5. Job Profile Policy
        await pool.query("ALTER TABLE JOB_PROFILE MODIFY job_type VARCHAR(50) DEFAULT 'Full Time'");
        const [jobsCount] = await pool.query('SELECT COUNT(*) as count FROM JOB_PROFILE');
        const count = Math.ceil(jobsCount[0].count * 0.1);
        await pool.query('UPDATE JOB_PROFILE SET status = ? ORDER BY RAND() LIMIT ?', ['closed', count]);
        await pool.query("UPDATE JOB_PROFILE SET job_description = 'https://placement.org/docs/job_description_official.pdf'");

        // 6. Offer Status (SAFE MAPPING THEN MODIFY)
        console.log('Remapping revoked offers and cleaning enum...');
        await pool.query("UPDATE OFFER SET offer_status = 'rejected' WHERE offer_status = 'revoked'");
        await pool.query("ALTER TABLE OFFER MODIFY offer_status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending'");

        // 7. Resume Keywords Normalization
        if (await columnExists('RESUME', 'parsed_keywords')) {
            await pool.query('CREATE TABLE IF NOT EXISTS RESUME_PARSED_KEYWORD (resume_id INT, keyword VARCHAR(100), PRIMARY KEY(resume_id, keyword), FOREIGN KEY (resume_id) REFERENCES RESUME(resume_id))');
            await pool.query(`
                INSERT IGNORE INTO RESUME_PARSED_KEYWORD (resume_id, keyword)
                SELECT resume_id, TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(REPLACE(parsed_keywords, ', ', ','), ',', n.n), ',', -1))
                FROM RESUME CROSS JOIN (SELECT 1 as n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) n
                WHERE n.n <= 1 + (LENGTH(parsed_keywords) - LENGTH(REPLACE(parsed_keywords, ',', '')))
            `);
            await pool.query('ALTER TABLE RESUME DROP COLUMN parsed_keywords');
        }

        // 8. Student Resume Sync
        await pool.query('UPDATE STUDENT s JOIN RESUME r ON s.s_id = r.s_id SET s.resume_url = r.file_url');

        // 9. User Role Policy
        await pool.query("UPDATE USER_ROLE SET password_hash = 'pcell2024' WHERE role = 'student'");
        if (await columnExists('USER_ROLE', 'last_login')) {
            await pool.query('ALTER TABLE USER_ROLE DROP COLUMN last_login');
        }

        console.log('✅ DATABASE TRANSFORMATION 100% COMPLETE.');
    } catch (err) {
        console.error('❌ UPGRADE ERROR:', err.message);
    } finally {
        process.exit();
    }
}

performUpgrade();
