// server/routes/views.js
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.query('SHOW FULL TABLES WHERE Table_type = \"VIEW\"');
        const viewNames = rows.map(r => Object.values(r)[0]);
        
        const descriptions = {};
        viewNames.forEach(v => {
            descriptions[v] = `Pre-defined database view: ${v}`;
        });

        res.json({
            availableViews: viewNames,
            descriptions
        });
    } catch (err) {
        res.status(500).json({ message: 'Error listing views' });
    }
});

router.get('/:viewName', requireAuth, async (req, res) => {
    const { viewName } = req.params;
    try {
        const [rows] = await pool.query(`SELECT * FROM \`${viewName}\` LIMIT 50`);
        res.json({ rows });
    } catch (err) {
        res.status(500).json({ message: `Error fetching view ${viewName}` });
    }
});

export default router;
