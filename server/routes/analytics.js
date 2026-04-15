import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────
// JOIN 1: All placed students with company & package
// INNER JOIN = only show rows that exist in BOTH tables
// ─────────────────────────────────────────────────────────
router.get('/placed-students', requireAuth, async (req, res) => {
    try {
        const sql = `
            SELECT 
                s.name        AS student_name,
                s.roll_no,
                s.cgpa,
                c.name        AS company_name,
                c.industry,
                p.package_lpa,
                p.offer_date
            FROM students s
            INNER JOIN placements p ON s.id = p.student_id
            INNER JOIN companies c  ON p.company_id = c.id
            ORDER BY p.package_lpa DESC
        `;
        const [rows] = await pool.query(sql);
        res.json({ sql, rows }); // send both the SQL and results to frontend
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────
// JOIN 2: All students with their applications (even if 0)
// LEFT JOIN = show ALL students, even ones with no applications
// ─────────────────────────────────────────────────────────
router.get('/students-with-applications', requireAuth, async (req, res) => {
    try {
        const sql = `
            SELECT 
                s.name          AS student_name,
                s.roll_no,
                s.cgpa,
                COUNT(a.id)     AS total_applications,
                SUM(CASE WHEN a.status = 'Selected' THEN 1 ELSE 0 END) AS selected_count
            FROM students s
            LEFT JOIN applications a ON s.id = a.student_id
            GROUP BY s.id, s.name, s.roll_no, s.cgpa
            ORDER BY total_applications DESC
        `;
        const [rows] = await pool.query(sql);
        res.json({ sql, rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────
// JOIN 3: Unplaced students (LEFT JOIN + NULL check)
// These are students with NO entry in placements table
// ─────────────────────────────────────────────────────────
router.get('/unplaced-students', requireAuth, async (req, res) => {
    try {
        const sql = `
            SELECT 
                s.name    AS student_name,
                s.roll_no,
                s.cgpa,
                s.status
            FROM students s
            LEFT JOIN placements p ON s.id = p.student_id
            WHERE p.id IS NULL
            ORDER BY s.cgpa DESC
        `;
        const [rows] = await pool.query(sql);
        res.json({ sql, rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────
// JOIN 4: Company-wise placement stats
// GROUP BY to aggregate per company
// ─────────────────────────────────────────────────────────
router.get('/company-stats', requireAuth, async (req, res) => {
    try {
        const sql = `
            SELECT 
                c.name                  AS company_name,
                c.industry,
                COUNT(p.id)             AS total_placements,
                AVG(p.package_lpa)      AS avg_package,
                MAX(p.package_lpa)      AS highest_package
            FROM companies c
            LEFT JOIN placements p ON c.id = p.company_id
            GROUP BY c.id, c.name, c.industry
            ORDER BY total_placements DESC
        `;
        const [rows] = await pool.query(sql);
        res.json({ sql, rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────
// Quick summary stats for admin dashboard
// ─────────────────────────────────────────────────────────
router.get('/summary', requireAuth, async (req, res) => {
    try {
        const [[studentCount]] = await pool.query('SELECT COUNT(*) AS total FROM students');
        const [[placedCount]]  = await pool.query('SELECT COUNT(*) AS total FROM placements');
        const [[companyCount]] = await pool.query('SELECT COUNT(*) AS total FROM companies');
        const [[appCount]]     = await pool.query('SELECT COUNT(*) AS total FROM applications');

        res.json({
            totalStudents:    studentCount.total,
            totalPlaced:      placedCount.total,
            totalCompanies:   companyCount.total,
            totalApplications: appCount.total,
            placementRate:    ((placedCount.total / studentCount.total) * 100).toFixed(1)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
