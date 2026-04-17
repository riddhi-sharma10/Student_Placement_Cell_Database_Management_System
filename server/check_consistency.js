
import pool from './db.js';

async function checkConsistency() {
    try {
        console.log('--- STARTING CONSISTENCY AUDIT ---\n');

        // Check 1: User Role Redundancy
        const [userRoleDiffs] = await pool.query('SELECT user_id, username, role, entity_type FROM USER_ROLE WHERE role != entity_type');
        if (userRoleDiffs.length > 0) {
            console.warn('⚠️ Inconsistency found in USER_ROLE: role and entity_type do not match for IDs:', userRoleDiffs.map(h => h.user_id));
        } else {
            console.log('✅ USER_ROLE: role and entity_type are consistent.');
        }

        // Check 2: Placement Record Summary vs Details
        // Let's check if the counts in COMPANY_VISIT_HISTORY match the PLACEMENT_RECORD counts
        const [visitHistoryInconsistency] = await pool.query(`
            SELECT cvh.visit_id, cvh.comp_id, cvh.academic_year, cvh.students_placed as reported, COUNT(pr.record_id) as actual
            FROM COMPANY_VISIT_HISTORY cvh
            LEFT JOIN PLACEMENT_RECORD pr ON cvh.comp_id = pr.comp_id AND cvh.academic_year = pr.academic_year
            GROUP BY cvh.visit_id
            HAVING reported != actual
        `);
        
        if (visitHistoryInconsistency.length > 0) {
            console.warn('⚠️ Inconsistency found in COMPANY_VISIT_HISTORY: students_placed count mismatch!');
            console.table(visitHistoryInconsistency);
        } else {
            console.log('✅ COMPANY_VISIT_HISTORY: Placement counts are consistent.');
        }

        // Check 3: Redundant Salary Snapshots
        const [salaryInconsistency] = await pool.query(`
            SELECT pr.record_id, pr.salary_offered as reported, jp.package as original
            FROM PLACEMENT_RECORD pr
            JOIN JOB_PROFILE jp ON pr.job_id = jp.job_id
            WHERE pr.salary_offered != jp.package
        `);

        if (salaryInconsistency.length > 0) {
            console.log(`ℹ️ Note: Found ${salaryInconsistency.length} records where the placed salary differs from the job profile package. (This is normal if negotiations happened).`);
        }

        console.log('\n--- AUDIT COMPLETE ---');

    } catch (err) {
        console.error('Error during consistency check:', err);
    } finally {
        await pool.end();
    }
}

checkConsistency();
