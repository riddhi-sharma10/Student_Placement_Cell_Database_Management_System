// server/routes/jobs.js
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT j.job_id as id, j.role, j.package_lpa as package, c.name as company 
            FROM JOB_PROFILE j
            JOIN COMPANY c ON j.comp_id = c.comp_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});

export default router;
