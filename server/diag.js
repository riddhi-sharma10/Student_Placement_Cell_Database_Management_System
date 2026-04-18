
import pool from './db.js';

async function run() {
    try {
        console.log('--- COORDINATORS ---');
        const [coords] = await pool.query("SELECT coord_id, name, dept FROM PLACEMENT_COORDINATOR");
        console.table(coords);
        
        console.log('\n--- AUTH USER ROLES (Coordinators) ---');
        const [users] = await pool.query("SELECT username, role, entity_id FROM USER_ROLE WHERE role = 'coordinator'");
        console.table(users);
        
        console.log('\n--- SNEHA PATIL APPLICATION COUNT (ID 1) ---');
        const [[{count}]] = await pool.query("SELECT COUNT(*) as count FROM APPLICATION a JOIN STUDENT s ON a.s_id = s.s_id WHERE s.coord_id = 1");
        console.log(`Sneha (ID 1) has ${count} applications associated.`);

    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}
run();
