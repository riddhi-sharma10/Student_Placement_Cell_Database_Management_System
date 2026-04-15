// server/routes/students.js
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/students
// Returns all students (admin) or only assigned students (coordinator)
router.get('/', requireAuth, async (req, res) => {
    try {
        let query = 'SELECT * FROM students';
        let params = [];

        // If the logged-in user is a coordinator, only show their students
        if (req.user.role === 'coordinator') {
            query = 'SELECT * FROM students WHERE coordinator_id = ?';
            params = [req.user.id];
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// GET /api/students/:id
// Returns one specific student's full profile
router.get('/:id', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM students WHERE id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Student not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

// PUT /api/students/:id
// Updates a student's profile (e.g. placement status)
router.put('/:id', requireAuth, async (req, res) => {
    const { status, cgpa } = req.body;
    try {
        await pool.query(
            'UPDATE students SET status = ?, cgpa = ? WHERE id = ?',
            [status, cgpa, req.params.id]
        );
        res.json({ success: true, message: 'Student updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update student' });
    }
});

export default router;
