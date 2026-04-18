import pool from '../server/db.js';

async function test() {
    try {
        const [rows] = await pool.query("SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE FROM information_schema.columns WHERE table_schema = 'placement_cell_db' AND table_name LIKE 'vw_%'");
        const tables = {};
        for (const row of rows) {
            if (!tables[row.TABLE_NAME]) tables[row.TABLE_NAME] = [];
            tables[row.TABLE_NAME].push(row.COLUMN_NAME);
        }
        console.log(JSON.stringify(tables, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}
test();
