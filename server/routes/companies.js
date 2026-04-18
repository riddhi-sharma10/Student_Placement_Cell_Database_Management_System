// server/routes/companies.js — UPDATED FOR REMOTE SCHEMA
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT comp_id as id, comp_name as name, industry_type as industry, tier, website, 'active' as status FROM COMPANY");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching companies' });
    }
});

export default router;
