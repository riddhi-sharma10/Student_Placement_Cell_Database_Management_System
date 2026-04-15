import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/applications
router.get('/', requireAuth, async (req, res) => {
    try {
        let query = 'SELECT * FROM applications';
        let params = [];

        if (req.user.role === 'student') {
            query = 'SELECT * FROM applications WHERE student_id = ?';
            params = [req.user.id];
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// PUT /api/applications/:id/status — update application status
router.put('/:id/status', requireAuth, async (req, res) => {
    const { status } = req.body;
    try {
        await pool.query(
            'UPDATE applications SET status = ? WHERE id = ?',
            [status, req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update status' });
    }
});

export default router;
