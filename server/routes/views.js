import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Only allow querying these specific views (security!)
const ALLOWED_VIEWS = [
    'vw_placed_students',
    'vw_active_applications',
    'vw_company_stats',
    'vw_unplaced_students'
];

// GET /api/views/vw_placed_students
// GET /api/views/vw_active_applications  etc.
router.get('/:viewName', requireAuth, async (req, res) => {
    const { viewName } = req.params;

    if (!ALLOWED_VIEWS.includes(viewName)) {
        return res.status(400).json({ error: `View '${viewName}' is not allowed` });
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM \`${viewName}\``);
        res.json({
            viewName,
            rowCount: rows.length,
            rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/views — list all available views
router.get('/', requireAuth, async (req, res) => {
    res.json({
        availableViews: ALLOWED_VIEWS,
        descriptions: {
            vw_placed_students: 'All students who have been placed, with company and package info',
            vw_active_applications: 'Applications still in progress (Applied, Shortlisted, Interview)',
            vw_company_stats: 'Per-company: total offers given, average CTC',
            vw_unplaced_students: 'Students not yet placed, ordered by CGPA'
        }
    });
});

export default router;
