import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/procedures/placement-report
// Body: { graduation_year: 2025 }
router.post('/placement-report', requireAuth, async (req, res) => {
    const { graduation_year } = req.body;
    if (!graduation_year) {
        return res.status(400).json({ error: 'graduation_year is required' });
    }
    try {
        // CALL runs a stored procedure
        // [results] contains array of result sets; [0] is the first SELECT's results
        const [results] = await pool.query('CALL sp_PlacementReport(?)', [graduation_year]);
        res.json({ results: results[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/procedures/dept-stats
// Body: { department: "Computer Science" }
router.post('/dept-stats', requireAuth, async (req, res) => {
    const { department } = req.body;
    try {
        const [results] = await pool.query('CALL sp_DeptStats(?)', [department]);
        res.json({ results: results[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/procedures/check-eligibility
// Body: { student_id: 1, job_id: 3 }
router.post('/check-eligibility', requireAuth, async (req, res) => {
    const { student_id, job_id } = req.body;
    try {
        const [results] = await pool.query('CALL sp_CheckEligibility(?, ?)', [student_id, job_id]);
        res.json({ result: results[0][0] }); // first row of first result set
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
