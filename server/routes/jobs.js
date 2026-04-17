// server/routes/jobs.js
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                j.job_id, 
                j.role, 
                j.package, 
                j.eligibility_cgpa,
                c.comp_name
            FROM JOB_PROFILE j
            JOIN COMPANY c ON j.comp_id = c.comp_id
            WHERE j.status = 'open'
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});

export default router;
