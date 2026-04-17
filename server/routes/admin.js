import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function requireAdmin(req, res, next) {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
    }
    next();
}

router.use(requireAuth, requireAdmin);

router.get('/dashboard', async (req, res) => {
    try {
        const [students] = await pool.query('SELECT COUNT(*) AS count FROM STUDENT');
        const [companies] = await pool.query('SELECT COUNT(*) AS count FROM COMPANY');
        const [applications] = await pool.query('SELECT COUNT(*) AS count FROM APPLICATION');
        const [verified] = await pool.query("SELECT COUNT(*) AS count FROM STUDENT WHERE profile_status IN ('Verified','Complete','Active')");
        const [interviews] = await pool.query("SELECT COUNT(*) AS count FROM APPLICATION WHERE status = 'Interview'");
        const [offers] = await pool.query("SELECT COUNT(*) AS count FROM APPLICATION WHERE status IN ('Selected','Placed','Accepted')");

        const [trend] = await pool.query(`
            SELECT DATE_FORMAT(applied_date, '%b') AS label,
                   COUNT(*) AS applications,
                   SUM(CASE WHEN status IN ('Selected','Placed','Accepted') THEN 1 ELSE 0 END) AS offers
            FROM APPLICATION
            WHERE applied_date IS NOT NULL
            GROUP BY DATE_FORMAT(applied_date, '%b'), MONTH(applied_date)
            ORDER BY MONTH(applied_date)
            LIMIT 6
        `);

        const [tiers] = await pool.query(`
            SELECT COALESCE(tier, 'Unknown') AS label, COUNT(*) AS value
            FROM COMPANY
            GROUP BY COALESCE(tier, 'Unknown')
            ORDER BY value DESC
        `);

        const [departments] = await pool.query(`
            SELECT COALESCE(s.dept, 'Unknown') AS name, COUNT(*) AS placed
            FROM APPLICATION a
            JOIN STUDENT s ON s.s_id = a.s_id
            WHERE a.status IN ('Selected','Placed','Accepted')
            GROUP BY COALESCE(s.dept, 'Unknown')
            ORDER BY placed DESC
            LIMIT 3
        `);

        const [topCompanies] = await pool.query(`
            SELECT c.name,
                   COALESCE(c.industry, 'N/A') AS industry,
                   SUM(CASE WHEN a.status IN ('Selected','Placed','Accepted') THEN 1 ELSE 0 END) AS offers
            FROM COMPANY c
            LEFT JOIN JOB_PROFILE j ON j.comp_id = c.comp_id
            LEFT JOIN APPLICATION a ON a.job_id = j.job_id
            GROUP BY c.comp_id, c.name, c.industry
            ORDER BY offers DESC, c.name ASC
            LIMIT 5
        `);

        const [records] = await pool.query(`
            SELECT
                s.s_name AS student,
                COALESCE(s.dept, 'Unknown') AS department,
                c.name AS company,
                COALESCE(j.package_lpa, 0) AS packageLpa,
                a.status AS status
            FROM APPLICATION a
            JOIN STUDENT s ON s.s_id = a.s_id
            LEFT JOIN JOB_PROFILE j ON j.job_id = a.job_id
            LEFT JOIN COMPANY c ON c.comp_id = j.comp_id
            ORDER BY a.applied_date DESC
            LIMIT 50
        `);

        const totalStudents = students[0]?.count || 0;
        const totalPlaced = offers[0]?.count || 0;

        res.json({
            stats: [
                { label: 'Total Students', value: totalStudents, icon: 'people-outline', note: '', noteType: 'neutral' },
                { label: 'Companies', value: companies[0]?.count || 0, icon: 'business-outline', note: '', noteType: 'active' },
                { label: 'Profiles Verified', value: verified[0]?.count || 0, icon: 'id-card-outline', note: '', noteType: 'neutral' },
                { label: 'Applications', value: applications[0]?.count || 0, icon: 'send-outline', note: '', noteType: 'neutral' },
                { label: 'Interviews', value: interviews[0]?.count || 0, icon: 'calendar-clear-outline', note: '', noteType: 'neutral' },
                { label: 'Total Offers', value: totalPlaced, icon: 'checkmark-done-outline', note: '', noteType: 'neutral' },
                { label: 'Placements', value: totalPlaced, icon: 'briefcase-outline', note: '', noteType: 'neutral' },
                { label: 'Placement %', value: totalStudents ? `${((totalPlaced / totalStudents) * 100).toFixed(1)}%` : '0.0%', icon: 'newspaper-outline', note: '', noteType: 'highlight' }
            ],
            trend: {
                labels: trend.map((row) => row.label),
                placements: trend.map((row) => Number(row.offers || 0))
            },
            tiers: tiers.map((row, index) => ({
                label: row.label,
                value: Number(row.value || 0),
                color: ['#0f2f61', '#4a6296', '#f2cf9e', '#7c8fa5'][index % 4]
            })),
            departments,
            topCompanies: topCompanies.map((row) => ({
                name: row.name,
                industry: row.industry,
                offers: Number(row.offers || 0)
            })),
            records: records.map((row) => ({
                initials: String(row.student || '').split(' ').slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase(),
                ...row,
                packageLpa: Number(row.packageLpa || 0),
                status: normalizeAdminStatus(row.status)
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching admin dashboard data' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const { role = 'all', status = 'all', branch = 'all', query = '' } = req.query;

        const [rows] = await pool.query(`
            SELECT
                u.user_id AS id,
                COALESCE(s.s_name, a.name, u.username) AS name,
                u.username,
                COALESCE(s.email, CONCAT(u.username, '@university.edu')) AS email,
                CASE WHEN u.role = 'student' THEN COALESCE(s.dept, '') ELSE '' END AS branch,
                CASE WHEN u.role = 'student' THEN CONCAT('ST-', LPAD(COALESCE(s.s_id, u.entity_id, 0), 4, '0'))
                     ELSE COALESCE(CAST(u.entity_id AS CHAR), '') END AS entityId,
                CASE WHEN u.role = 'student' THEN COALESCE(s.profile_status, 'Active') ELSE 'Active' END AS status,
                CASE WHEN u.role = 'student' THEN 'Standard' ELSE 'Elevated' END AS permission,
                u.role,
                0 AS lastLoginDays
            FROM USER_ROLE u
            LEFT JOIN STUDENT s ON u.role = 'student' AND s.s_id = u.entity_id
            LEFT JOIN CGDC_ADMIN a ON u.role IN ('coordinator','admin') AND a.cgdc_id = u.entity_id
        `);

        const filtered = rows.filter((row) => {
            const haystack = [row.name, row.username, row.email, row.entityId, row.role, row.branch].join(' ').toLowerCase();
            const matchesQuery = !query || haystack.includes(String(query).toLowerCase());
            const matchesRole = role === 'all' || row.role.toLowerCase() === String(role).toLowerCase();
            const matchesStatus = status === 'all' || row.status === status;
            const matchesBranch = branch === 'all' || row.branch === branch;
            return matchesQuery && matchesRole && matchesStatus && matchesBranch;
        });

        res.json(filtered);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching admin users' });
    }
});

router.get('/companies', async (req, res) => {
    try {
        const { tier = 'all', status = 'all', query = '' } = req.query;
        const [rows] = await pool.query(`
            SELECT
                c.comp_id AS id,
                c.name,
                COALESCE(c.industry, 'N/A') AS industry,
                COALESCE(c.tier, 'Unknown') AS tier,
                COALESCE(c.status, 'active') AS status,
                COALESCE(c.website, '') AS website,
                COUNT(DISTINCT j.job_id) AS activeJobs,
                SUM(CASE WHEN a.status IN ('Selected','Placed','Accepted') THEN 1 ELSE 0 END) AS placements,
                COUNT(DISTINCT j.job_id) AS positionsCount
            FROM COMPANY c
            LEFT JOIN JOB_PROFILE j ON j.comp_id = c.comp_id
            LEFT JOIN APPLICATION a ON a.job_id = j.job_id
            GROUP BY c.comp_id, c.name, c.industry, c.tier, c.status, c.website
            ORDER BY c.name ASC
        `);

        const filtered = rows.filter((row) => {
            const haystack = [row.name, row.industry, row.tier, row.status].join(' ').toLowerCase();
            const matchesQuery = !query || haystack.includes(String(query).toLowerCase());
            const matchesTier = tier === 'all' || row.tier === tier;
            const matchesStatus = status === 'all' || row.status === status;
            return matchesQuery && matchesTier && matchesStatus;
        });

        res.json(filtered);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching admin companies' });
    }
});

router.get('/records', async (req, res) => {
    try {
        const { year = 'all', status = 'all', department = 'all', query = '' } = req.query;
        const [rows] = await pool.query(`
            SELECT
                a.app_id AS id,
                s.s_name AS student,
                COALESCE(s.dept, 'Unknown') AS department,
                c.name AS company,
                COALESCE(j.package_lpa, 0) AS packageLpa,
                COALESCE(a.status, 'Applied') AS status,
                a.applied_date,
                YEAR(a.applied_date) AS appliedYear
            FROM APPLICATION a
            JOIN STUDENT s ON s.s_id = a.s_id
            LEFT JOIN JOB_PROFILE j ON j.job_id = a.job_id
            LEFT JOIN COMPANY c ON c.comp_id = j.comp_id
            ORDER BY a.applied_date DESC
        `);

        const filtered = rows.filter((row) => {
            const haystack = [row.student, row.department, row.company, row.status].join(' ').toLowerCase();
            const matchesQuery = !query || haystack.includes(String(query).toLowerCase());
            const matchesYear = year === 'all' || String(row.appliedYear) === String(year);
            const matchesStatus = status === 'all' || row.status === status;
            const matchesDepartment = department === 'all' || row.department === department;
            return matchesQuery && matchesYear && matchesStatus && matchesDepartment;
        }).map((row) => ({
            ...row,
            packageLpa: Number(row.packageLpa || 0),
            initials: String(row.student || '').split(' ').slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase(),
            status: normalizeAdminStatus(row.status)
        }));

        res.json({ rows: filtered, years: [...new Set(rows.map((row) => row.appliedYear).filter(Boolean))].sort((a, b) => b - a) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching admin records' });
    }
});

router.get('/analytics', async (req, res) => {
    try {
        const [summary] = await pool.query('SELECT * FROM vw_placement_overall_summary');
        const [monthly] = await pool.query(`
            SELECT DATE_FORMAT(applied_date, '%b') AS monthLabel,
                   MONTH(applied_date) AS monthIndex,
                   COUNT(*) AS applications,
                   SUM(CASE WHEN status IN ('Selected','Placed','Accepted') THEN 1 ELSE 0 END) AS offers
            FROM APPLICATION
            WHERE applied_date IS NOT NULL
            GROUP BY MONTH(applied_date), DATE_FORMAT(applied_date, '%b')
            ORDER BY monthIndex
            LIMIT 6
        `);

        const [deptStats] = await pool.query(`
            SELECT COALESCE(s.dept, 'Unknown') AS name,
                   ROUND(100 * SUM(CASE WHEN a.status IN ('Selected','Placed','Accepted') THEN 1 ELSE 0 END) / COUNT(*), 1) AS placementPct,
                   ROUND(AVG(COALESCE(j.package_lpa, 0)), 1) AS avgLpa,
                   ROUND(AVG(COALESCE(s.cgpa, 0)), 1) AS medianAts
            FROM APPLICATION a
            JOIN STUDENT s ON s.s_id = a.s_id
            LEFT JOIN JOB_PROFILE j ON j.job_id = a.job_id
            GROUP BY COALESCE(s.dept, 'Unknown')
            ORDER BY placementPct DESC
        `);

        res.json({
            summary: summary[0] || {},
            monthly: monthly.map((row) => ({
                label: row.monthLabel,
                applications: Number(row.applications || 0),
                offers: Number(row.offers || 0)
            })),
            departments: deptStats
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching admin analytics' });
    }
});

function normalizeAdminStatus(status) {
    const value = String(status || '').toLowerCase();
    if (['selected', 'placed', 'accepted'].includes(value)) return 'Placed';
    if (value === 'interview') return 'In Progress';
    if (value === 'rejected') return 'Rejected';
    return 'In Progress';
}

export default router;