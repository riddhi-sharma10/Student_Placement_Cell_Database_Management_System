
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get resume history for current student
router.get('/', requireAuth, async (req, res) => {
    if (req.user.role !== 'student') return res.status(403).json({ message: 'Access denied' });

    try {
        const studentId = req.user.entityId;
        if (!studentId) {
            console.error('No entityId found in token for user:', req.user.id);
            return res.status(400).json({ error: 'User profile not linked to a student record' });
        }

        const [rows] = await pool.query(
            'SELECT resume_id as id, file_url as filename, ats_score as score, uploaded_on as date FROM RESUME WHERE s_id = ? ORDER BY uploaded_on DESC',
            [studentId]
        );
        res.json(rows);
    } catch (err) {
        console.error('ATS FETCH ERROR:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
