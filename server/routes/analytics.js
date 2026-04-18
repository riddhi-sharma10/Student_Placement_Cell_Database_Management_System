
// server/routes/analytics.js — UPDATED FOR REMOTE SCHEMA
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// 1. Get Summary Stats (using views if possible)
router.get('/summary', requireAuth, async (req, res) => {
    try {
        const [overall] = await pool.query('SELECT * FROM vw_placement_overall_summary');
        const [companies] = await pool.query('SELECT COUNT(*) as count FROM COMPANY');
        const [apps] = await pool.query('SELECT COUNT(*) as count FROM APPLICATION');

        const stats = {
            totalStudents: overall[0]?.total_students || 0,
            totalPlaced: overall[0]?.total_placed_students || 0,
            placementRate: overall[0] ? ((overall[0].total_placed_students / overall[0].total_students) * 100).toFixed(1) : 0,
            totalCompanies: companies[0].count,
            totalApplications: apps[0].count
        };

        res.json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching summary analytics' });
    }
});

// 2. Get Student Application Stats
router.get('/students-with-applications', requireAuth, async (req, res) => {
    try {
        // Fetch from the pre-built view on your server
        const [rows] = await pool.query('SELECT s_id as id, s_name as student_name, dept, total_applications FROM vw_student_application_stats');
        
        // Add additional info from BASE tables
        const [placements] = await pool.query('SELECT s_id FROM OFFER WHERE status = "Accepted"');
        const placedIds = new Set(placements.map(p => p.s_id));

        const enriched = rows.map(r => ({
            ...r,
            roll_no: `ROLL-${r.id}`, 
            total_applications: r.total_applications,
            selected_count: placedIds.has(r.id) ? 1 : 0,
            cgpa: '--'
        }));

        res.json({ rows: enriched });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching student application statistics' });
    }
});

// 3. Get Full Placement History (for Student History page)
router.get('/history', requireAuth, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vw_accurate_visit_history ORDER BY academic_year DESC');
        
        const transformed = rows.map(r => ({
            year: r.academic_year.toString(),
            comp_name: r.comp_name,
            placed: r.actual_students_placed,
            highest: `₹${r.actual_highest_salary} LPA`,
            average: `₹${r.actual_avg_salary} LPA`
        }));

        res.json(transformed);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching placement history' });
    }
});

export default router;
