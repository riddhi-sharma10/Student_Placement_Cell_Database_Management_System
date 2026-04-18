import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

function requireCoordinator(req, res, next) {
    if (req.user?.role !== 'coordinator') {
        return res.status(403).json({ message: 'Coordinator access only' });
    }
    next();
}
router.use(requireCoordinator);

async function getCoordinator(coordId) {
    const [rows] = await pool.query(
        `SELECT pc.coord_id, pc.name, pc.dept, pc.email, pc.phone_no
         FROM PLACEMENT_COORDINATOR pc
         WHERE pc.coord_id = ?`,
        [coordId]
    );
    if (!rows.length) throw new Error(`Coordinator ID ${coordId} not found`);
    return rows[0];
}

/* ════════════════════════════════════════════════════
   GET /api/coordinator/dashboard
   Counts via JOIN on STUDENT.coord_id FK
════════════════════════════════════════════════════ */
router.get('/dashboard', async (req, res) => {
    try {
        const coordId = req.user.entityId;
        console.log('[coordinator/dashboard] coordId =', coordId);

        const [[{ total: totalStudents }]] = await pool.query(
            'SELECT COUNT(*) AS total FROM STUDENT WHERE coord_id = ?', [coordId]
        );
        const [[{ placed: totalPlaced }]] = await pool.query(
            `SELECT COUNT(DISTINCT o.s_id) AS placed
             FROM OFFER o
             INNER JOIN STUDENT s ON o.s_id = s.s_id
             WHERE s.coord_id = ? AND LOWER(o.offer_status) = 'accepted'`,
            [coordId]
        );
        const [[{ total: totalApplications }]] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM APPLICATION a
             INNER JOIN STUDENT s ON a.s_id = s.s_id
             WHERE s.coord_id = ?`,
            [coordId]
        );
        const [[{ total: upcomingInterviews }]] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM INTERVIEW i
             INNER JOIN STUDENT s ON i.s_id = s.s_id
             WHERE s.coord_id = ? AND i.interview_date >= CURDATE()`,
            [coordId]
        );

        const placementRate = totalStudents > 0
            ? ((totalPlaced / totalStudents) * 100).toFixed(1)
            : '0.0';

        console.log('[coordinator/dashboard] result:', { totalStudents, totalPlaced, placementRate, totalApplications, upcomingInterviews });
        res.json({ totalStudents, totalPlaced, placementRate, totalApplications, upcomingInterviews });
    } catch (err) {
        console.error('[coordinator/dashboard] ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
});

/* ════════════════════════════════════════════════════
   GET /api/coordinator/students
   JOIN: STUDENT + PLACEMENT_COORDINATOR + offer/app counts
════════════════════════════════════════════════════ */
router.get('/students', async (req, res) => {
    try {
        const coordId = req.user.entityId;
        console.log('[coordinator/students] coordId =', coordId);

        const [rows] = await pool.query(
            `SELECT
                s.s_id           AS id,
                s.s_name         AS name,
                s.email,
                s.dept,
                s.cgpa,
                s.graduation_yr  AS gradYear,
                s.profile_status AS status,
                s.resume_url     AS resumeUrl,
                COUNT(DISTINCT a.app_id)   AS appCount,
                COUNT(DISTINCT o.offer_id) AS offerCount
             FROM STUDENT s
             LEFT JOIN APPLICATION a ON a.s_id = s.s_id
             LEFT JOIN OFFER       o ON o.s_id = s.s_id
             WHERE s.coord_id = ?
             GROUP BY s.s_id, s.s_name, s.email, s.dept, s.cgpa,
                      s.graduation_yr, s.profile_status, s.resume_url
             ORDER BY s.s_name ASC`,
            [coordId]
        );

        console.log('[coordinator/students] count =', rows.length);
        res.json(rows.map(r => ({
            id: r.id,
            name: r.name,
            email: r.email,
            rollNo: `STU-${String(r.id).padStart(4, '0')}`,
            cgpa: Number(r.cgpa || 0).toFixed(2),
            status: r.status || 'active',
            gradYear: r.gradYear || 2025,
            department: r.dept,
            appCount: r.appCount,
            offerCount: r.offerCount,
            avatar: String(r.name).split(' ').slice(0, 2).map(n => n[0] || '').join('').toUpperCase()
        })));
    } catch (err) {
        console.error('[coordinator/students] ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
});

/* ════════════════════════════════════════════════════
   GET /api/coordinator/applications
   5-table JOIN: APPLICATION + STUDENT + JOB_PROFILE + COMPANY + RESUME
   Real columns: JOB_PROFILE.package, COMPANY.industry_type
════════════════════════════════════════════════════ */
router.get('/applications', async (req, res) => {
    try {
        const coordId = req.user.entityId;
        console.log('[coordinator/applications] coordId =', coordId);

        const [rows] = await pool.query(
            `SELECT
                a.app_id                                AS id,
                s.s_name                               AS studentName,
                s.dept,
                c.comp_name                            AS company,
                c.industry_type                        AS industry,
                c.tier,
                j.role,
                j.package                              AS packageLpa,
                DATE_FORMAT(a.applied_date,'%e %b %Y') AS appliedDate,
                a.status,
                a.ats_score                            AS atsScore
             FROM APPLICATION a
             INNER JOIN STUDENT     s ON a.s_id    = s.s_id
             INNER JOIN JOB_PROFILE j ON a.job_id  = j.job_id
             INNER JOIN COMPANY     c ON j.comp_id = c.comp_id
             LEFT  JOIN RESUME      r ON a.resume_id = r.resume_id
             WHERE s.coord_id = ?
             ORDER BY a.applied_date DESC`,
            [coordId]
        );

        console.log('[coordinator/applications] count =', rows.length);
        res.json(rows.map(r => ({ ...r, status: String(r.status || 'applied').toLowerCase() })));
    } catch (err) {
        console.error('[coordinator/applications] ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
});

/* ════════════════════════════════════════════════════
   GET /api/coordinator/interviews
   JOIN: INTERVIEW + STUDENT + JOB_PROFILE + COMPANY
   Real cols: interview_mode, interview_result (no round_type / status / app_id)
════════════════════════════════════════════════════ */
router.get('/interviews', async (req, res) => {
    try {
        const coordId = req.user.entityId;
        console.log('[coordinator/interviews] coordId =', coordId);

        const [rows] = await pool.query(
            `SELECT
                i.interview_id                             AS id,
                s.s_name                                   AS studentName,
                s.dept,
                c.comp_name                                AS company,
                j.role,
                i.interview_mode                           AS mode,
                i.panel_name                               AS panel,
                DATE_FORMAT(i.interview_date,'%e %b %Y')  AS date,
                i.interview_result                         AS result,
                CASE
                    WHEN i.interview_date >= CURDATE() THEN 'upcoming'
                    ELSE 'past'
                END AS timing
             FROM INTERVIEW i
             INNER JOIN STUDENT     s ON i.s_id    = s.s_id
             INNER JOIN JOB_PROFILE j ON i.job_id  = j.job_id
             INNER JOIN COMPANY     c ON j.comp_id = c.comp_id
             WHERE s.coord_id = ?
             ORDER BY i.interview_date DESC`,
            [coordId]
        );

        console.log('[coordinator/interviews] count =', rows.length);
        res.json(rows.map(r => ({
            id: r.id,
            studentName: r.studentName,
            dept: r.dept,
            company: r.company,
            role: r.role,
            mode: r.mode || 'online',
            panel: r.panel || '—',
            date: r.date,
            result: String(r.result || 'pending').toLowerCase(),
            timing: r.timing
        })));
    } catch (err) {
        console.error('[coordinator/interviews] ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
});

/* ════════════════════════════════════════════════════
   GET /api/coordinator/offers
   JOIN: OFFER + STUDENT + JOB_PROFILE + COMPANY
   Real cols: OFFER.ctc, OFFER.issued_on, OFFER.joining_date
════════════════════════════════════════════════════ */
router.get('/offers', async (req, res) => {
    try {
        const coordId = req.user.entityId;
        console.log('[coordinator/offers] coordId =', coordId);

        const [rows] = await pool.query(
            `SELECT
                o.offer_id                               AS id,
                s.s_name                                 AS studentName,
                s.dept,
                c.comp_name                              AS company,
                c.industry_type                          AS industry,
                c.tier,
                j.role,
                j.package                                AS listedPackage,
                o.ctc                                    AS ctc,
                o.offer_status                           AS status,
                DATE_FORMAT(o.joining_date,'%e %b %Y')  AS joiningDate,
                DATE_FORMAT(o.issued_on,   '%e %b %Y')  AS issuedOn
             FROM OFFER o
             INNER JOIN STUDENT     s ON o.s_id    = s.s_id
             INNER JOIN JOB_PROFILE j ON o.job_id  = j.job_id
             INNER JOIN COMPANY     c ON j.comp_id = c.comp_id
             WHERE s.coord_id = ?
             ORDER BY o.issued_on DESC`,
            [coordId]
        );

        console.log('[coordinator/offers] count =', rows.length);
        res.json(rows.map(r => ({ ...r, status: String(r.status || 'pending').toLowerCase() })));
    } catch (err) {
        console.error('[coordinator/offers] ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
});

/* ════════════════════════════════════════════════════
   GET /api/coordinator/placements
   JOIN: OFFER + STUDENT + JOB_PROFILE + COMPANY + PLACEMENT_RECORD
   Real cols: PLACEMENT_RECORD.salary_offered, PLACEMENT_RECORD.status
════════════════════════════════════════════════════ */
router.get('/placements', async (req, res) => {
    try {
        const coordId = req.user.entityId;
        console.log('[coordinator/placements] coordId =', coordId);

        const [rows] = await pool.query(
            `SELECT
                s.s_name                                  AS studentName,
                s.dept,
                s.cgpa,
                c.comp_name                               AS company,
                c.industry_type                           AS industry,
                c.tier,
                j.role,
                o.ctc                                     AS ctc,
                o.offer_status                            AS offerStatus,
                DATE_FORMAT(o.joining_date,'%e %b %Y')   AS joiningDate,
                pr.record_id                              AS recordId,
                pr.salary_offered                         AS recordSalary,
                pr.status                                 AS recordStatus
             FROM OFFER o
             INNER JOIN STUDENT          s  ON o.s_id    = s.s_id
             INNER JOIN JOB_PROFILE      j  ON o.job_id  = j.job_id
             INNER JOIN COMPANY          c  ON j.comp_id = c.comp_id
             LEFT  JOIN PLACEMENT_RECORD pr ON pr.s_id   = s.s_id AND pr.job_id = o.job_id
             WHERE s.coord_id = ? AND LOWER(o.offer_status) = 'accepted'
             ORDER BY o.ctc DESC`,
            [coordId]
        );

        console.log('[coordinator/placements] count =', rows.length);
        res.json(rows.map(r => ({
            initials: String(r.studentName).split(' ').slice(0, 2).map(n => n[0] || '').join('').toUpperCase(),
            studentName: r.studentName,
            department: r.dept,
            cgpa: Number(r.cgpa || 0).toFixed(2),
            company: r.company,
            industry: r.industry || '—',
            tier: r.tier || '—',
            role: r.role,
            ctc: r.ctc || 0,
            joiningDate: r.joiningDate || 'TBD',
            verified: !!r.recordId,
            recordStatus: r.recordStatus || null
        })));
    } catch (err) {
        console.error('[coordinator/placements] ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
});

/* ════════════════════════════════════════════════════
   GET /api/coordinator/profile
   JOIN: PLACEMENT_COORDINATOR with student counts
════════════════════════════════════════════════════ */
router.get('/profile', async (req, res) => {
    try {
        const coordId = req.user.entityId;
        console.log('[coordinator/profile] coordId =', coordId);

        const coord = await getCoordinator(coordId);

        const [[{ count }]] = await pool.query(
            'SELECT COUNT(*) AS count FROM STUDENT WHERE coord_id = ?', [coordId]
        );
        const [[{ placed }]] = await pool.query(
            `SELECT COUNT(DISTINCT o.s_id) AS placed
             FROM OFFER o
             INNER JOIN STUDENT s ON o.s_id = s.s_id
             WHERE s.coord_id = ? AND LOWER(o.offer_status) = 'accepted'`,
            [coordId]
        );

        res.json({
            name: coord.name,
            email: coord.email,
            phone: coord.phone_no || 'Not set',
            department: coord.dept,
            designation: `Placement Coordinator — ${coord.dept}`,
            studentsManaged: count,
            studentsPlaced: placed
        });
    } catch (err) {
        console.error('[coordinator/profile] ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
});

/* ════════════════════════════════════════════════════
   PUT /api/coordinator/profile
════════════════════════════════════════════════════ */
router.put('/profile', async (req, res) => {
    try {
        const coordId = req.user.entityId;
        const { name, phone } = req.body;
        const sets = []; const vals = [];
        if (name?.trim())  { sets.push('name = ?');     vals.push(name.trim()); }
        if (phone?.trim()) { sets.push('phone_no = ?'); vals.push(phone.trim()); }
        if (sets.length) {
            vals.push(coordId);
            await pool.query(`UPDATE PLACEMENT_COORDINATOR SET ${sets.join(', ')} WHERE coord_id = ?`, vals);
        }
        res.json({ success: true, message: 'Profile updated' });
    } catch (err) {
        console.error('[coordinator/profile PUT] ERROR:', err.message);
        res.status(500).json({ message: err.message });
    }
});

export default router;
