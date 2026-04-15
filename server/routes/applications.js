// server/routes/applications.js — UPDATED FOR REMOTE SCHEMA
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        let query = 'SELECT app_id as id, s_id, job_id, status, applied_date FROM APPLICATION';
        let params = [];

        if (req.user.role === 'student') {
            query += ' WHERE s_id = ?';
            params.push(req.user.entityId);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching applications' });
    }
});

export default router;
