import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM companies ORDER BY name');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
});

export default router;
