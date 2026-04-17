# 🚀 Full-Stack Implementation Plan
## Student Placement Cell — Connecting Frontend to MySQL

> **Who is this for?** Someone who has never connected a frontend to a database before.  
> Everything is explained step by step, with exact code to copy-paste.

---

## 📖 UNDERSTAND THE BIG PICTURE FIRST

Right now your app works like this:
```
Browser (Vite) → reads hardcoded data from data.js → shows UI
```

After this plan, it will work like this:
```
Browser (Vite) → sends HTTP request → Node.js server → MySQL database → returns data → shows UI
```

Think of it like a restaurant:
- **Browser** = Customer (wants food / data)
- **Node.js + Express** = Waiter (takes order, brings it back)  
- **MySQL** = Kitchen (where actual data is stored and cooked)

The customer never walks into the kitchen. The waiter is the middleman.

---

## 🗂️ WHAT YOU WILL BUILD

```
Student_Placement_Cell_Database_Management_System/
│
├── index.html                ← Already exists (your frontend entry)
├── index.css                 ← Already exists
├── coordinator.css           ← Already exists
├── vite.config.js            ← NEW: tells Vite to forward /api calls to backend
│
├── js/                       ← Already exists (all your UI pages)
│   ├── api.js                ← NEW: one file to make all backend calls
│   ├── app.js                ← Already exists (tweak login only)
│   └── ...all your pages...
│
└── server/                   ← NEW FOLDER: entire backend lives here
    ├── package.json          ← NEW: backend dependencies
    ├── .env                  ← NEW: database password (keep secret)
    ├── index.js              ← NEW: starts the backend server
    ├── db.js                 ← NEW: connects to MySQL
    └── routes/               ← NEW: each file handles one type of data
        ├── auth.js           ← login/logout
        ├── students.js       ← student data
        ├── companies.js      ← company data
        ├── applications.js   ← application data
        ├── analytics.js      ← joins & aggregated stats
        ├── views.js          ← your MySQL views
        └── procedures.js     ← your stored procedures
```

---

## ✅ PHASE 1: Install Required Tools

### Step 1.1 — Install Node.js
If you haven't already:
- Go to https://nodejs.org → Download **LTS version** → Install it
- Verify: open terminal and type `node --version` (should show v18 or above)

### Step 1.2 — Install MySQL
You probably already have this. Verify by opening MySQL Workbench or running:
```
mysql --version
```

### Step 1.3 — Install backend packages
Open terminal, go inside your project:
```bash
cd "C:\Users\awast\OneDrive\Desktop\Sem-4\Student_Placement_Cell_Database_Management_System"
```

Create the server folder and go into it:
```bash
mkdir server
cd server
```

Create a package.json for the backend:
```bash
npm init -y
```

Install the packages your backend needs:
```bash
npm install express mysql2 dotenv cors jsonwebtoken
```

What each package does:
| Package | Purpose |
|---|---|
| `express` | Creates the web server (the waiter) |
| `mysql2` | Lets Node.js talk to MySQL |
| `dotenv` | Reads your `.env` secret file |
| `cors` | Allows your browser to talk to your server |
| `jsonwebtoken` | Creates login tokens (like a wristband at an event) |
 
Now go back to root and install concurrently (runs both servers at once):
```bash
cd ..
npm install concurrently --save-dev
```

---

## ✅ PHASE 2: Set Up The Backend Server

### Step 2.1 — Create `server/.env`
This file stores your database password. **Never upload this to GitHub.**

Create file `server/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=placement_cell
JWT_SECRET=mysecretkey123
PORT=3001
```

Replace `your_mysql_password_here` with your actual MySQL root password.
Replace `placement_cell` with your actual database name.

Also create `server/.gitignore`:
```
node_modules/
.env
```

---

### Step 2.2 — Create `server/db.js` (The MySQL Connection)

This file creates a "pool" — a set of ready-to-use MySQL connections.  
Think of it like having 10 waiters ready instead of just 1.

```javascript
// server/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // reads your .env file

const pool = mysql.createPool({
    host: process.env.DB_HOST,       // localhost
    user: process.env.DB_USER,       // root
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,             // max 10 simultaneous queries
    queueLimit: 0
});

// Test the connection when server starts
pool.getConnection()
    .then(conn => {
        console.log('✅ MySQL connected successfully!');
        conn.release(); // return it to the pool
    })
    .catch(err => {
        console.error('❌ MySQL connection failed:', err.message);
    });

export default pool;
```

---

### Step 2.3 — Create `server/index.js` (The Express Server)

```javascript
// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// MIDDLEWARE (things that run before every request)
app.use(cors({
    origin: 'http://localhost:5173' // your Vite frontend URL
}));
app.use(express.json()); // parse incoming JSON data

// IMPORT ROUTES (each file handles one type of data)
import authRouter from './routes/auth.js';
import studentsRouter from './routes/students.js';
import companiesRouter from './routes/companies.js';
import applicationsRouter from './routes/applications.js';
import analyticsRouter from './routes/analytics.js';
import viewsRouter from './routes/views.js';
import proceduresRouter from './routes/procedures.js';

// REGISTER ROUTES
// Any request to /api/auth/* → goes to auth.js
// Any request to /api/students/* → goes to students.js
// etc.
app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/views', viewsRouter);
app.use('/api/procedures', proceduresRouter);

// Health check (open this in browser to test: http://localhost:3001/api/health)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running!' });
});

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
```

Open `server/package.json` and make it look like this:
```json
{
  "name": "placement-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^3.0.0"
  }
}
```

---

## ✅ PHASE 3: Create Auth Route (Login)

### Step 3.1 — What your MySQL `users` table should look like

Run this in MySQL Workbench to create a users table (if you don't have one):
```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(150) NOT NULL,
    role ENUM('student', 'coordinator', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users (plain text password for now)
INSERT INTO users (username, password, name, role) VALUES
('riddhi001', 'pass123', 'Riddhi Sharma', 'student'),
('priya.coord', 'coord123', 'Priya Singh', 'coordinator'),
('admin', 'admin123', 'Super Admin', 'admin');
```

### Step 3.2 — Create `server/routes/auth.js`

```javascript
// server/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// POST /api/auth/login
// Called when user clicks "Login to Portal"
router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    // Basic validation
    if (!username || !password || !role) {
        return res.status(400).json({ error: 'Username, password and role are required' });
    }

    try {
        // Query MySQL: find user with this username AND role
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ? AND role = ?',
            [username, role]
        );

        // No user found
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or role' });
        }

        const user = rows[0];

        // Check password (plain text comparison for now)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Wrong password' });
        }

        // Create a JWT token — this is like a wristband
        // It proves the user is logged in for the next 8 hours
        const token = jwt.sign(
            { id: user.id, role: user.role, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        // Send back the token and user info
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
});

export default router;
```

---

## ✅ PHASE 4: Create Auth Middleware (Protect Routes)

Every route except login should require the user to be logged in.  
This middleware checks the JWT token attached to every request.

Create `server/middleware/auth.js`:
```javascript
// server/middleware/auth.js
import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    // The token comes in the request header like:
    // Authorization: Bearer eyJhbGc...
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided. Please log in.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token is valid and not expired
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info to the request
        next(); // continue to the actual route
    } catch (err) {
        return res.status(401).json({ error: 'Token expired or invalid. Please log in again.' });
    }
}
```

---

## ✅ PHASE 5: Create Data Routes

### `server/routes/students.js`

```javascript
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
```

### `server/routes/companies.js`

```javascript
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
```

### `server/routes/applications.js`

```javascript
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
```

---

## ✅ PHASE 6: Expose JOINs via Analytics Route

### What is a JOIN?
A JOIN combines rows from two tables based on a related column.

**Example**: You have a `students` table and a `placements` table.  
To show "which student got placed at which company", you need to JOIN them.

```
students table:         placements table:
id | name               id | student_id | company_id | package
 1 | Riddhi              1 |     1      |     3      |   45
 2 | Alex               
```

After JOIN:
```
name   | company  | package
Riddhi | Google   | 45
```

### Create `server/routes/analytics.js`

```javascript
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
```

---

## ✅ PHASE 7: Expose MySQL VIEWS

### What is a View?
A **View** is a saved SQL query that looks like a table.  
Instead of writing a long JOIN every time, you create a view once and query it like a normal table.

**Create these views in MySQL Workbench:**
```sql
-- View 1: All placed students with all details
CREATE OR REPLACE VIEW vw_placed_students AS
    SELECT s.name, s.roll_no, s.cgpa, c.name AS company, p.package_lpa
    FROM students s
    INNER JOIN placements p ON s.id = p.student_id
    INNER JOIN companies c ON p.company_id = c.id;

-- View 2: Active applications (not yet decided)
CREATE OR REPLACE VIEW vw_active_applications AS
    SELECT a.id, s.name AS student_name, c.name AS company_name, a.status, a.applied_date
    FROM applications a
    JOIN students s ON a.student_id = s.id
    JOIN companies c ON a.company_id = c.id
    WHERE a.status IN ('Applied', 'Shortlisted', 'Interview');

-- View 3: Per-company statistics
CREATE OR REPLACE VIEW vw_company_stats AS
    SELECT c.name, COUNT(p.id) AS total_offers, AVG(p.package_lpa) AS avg_ctc
    FROM companies c
    LEFT JOIN placements p ON c.id = p.company_id
    GROUP BY c.id, c.name;

-- View 4: Unplaced students
CREATE OR REPLACE VIEW vw_unplaced_students AS
    SELECT s.name, s.roll_no, s.cgpa, s.status
    FROM students s
    LEFT JOIN placements p ON s.id = p.student_id
    WHERE p.id IS NULL;
```

### Create `server/routes/views.js`

```javascript
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Only allow querying these specific views (security!)
const ALLOWED_VIEWS = [
    'vw_placed_students',
    'vw_active_applications',
    'vw_company_stats',
    'vw_unplaced_students'
];

// GET /api/views/vw_placed_students
// GET /api/views/vw_active_applications  etc.
router.get('/:viewName', requireAuth, async (req, res) => {
    const { viewName } = req.params;

    if (!ALLOWED_VIEWS.includes(viewName)) {
        return res.status(400).json({ error: `View '${viewName}' is not allowed` });
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM \`${viewName}\``);
        res.json({
            viewName,
            rowCount: rows.length,
            rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/views — list all available views
router.get('/', requireAuth, async (req, res) => {
    res.json({
        availableViews: ALLOWED_VIEWS,
        descriptions: {
            vw_placed_students: 'All students who have been placed, with company and package info',
            vw_active_applications: 'Applications still in progress (Applied, Shortlisted, Interview)',
            vw_company_stats: 'Per-company: total offers given, average CTC',
            vw_unplaced_students: 'Students not yet placed, ordered by CGPA'
        }
    });
});

export default router;
```

---

## ✅ PHASE 8: Expose Stored Procedures

### What is a Stored Procedure?
A **Stored Procedure** is a named block of SQL code saved in the database.  
Instead of sending raw SQL from your app, you call the procedure by name.

Benefits:
- Reusable
- Faster (pre-compiled)
- Safer (less SQL injection risk)

**Create these procedures in MySQL Workbench:**
```sql
DELIMITER $$

-- Procedure 1: Full placement report for a graduation year
CREATE PROCEDURE sp_PlacementReport(IN grad_year INT)
BEGIN
    SELECT 
        s.name, s.roll_no, s.cgpa,
        c.name AS company,
        p.package_lpa,
        p.offer_date
    FROM students s
    JOIN placements p ON s.id = p.student_id
    JOIN companies c ON p.company_id = c.id
    WHERE s.graduation_year = grad_year
    ORDER BY p.package_lpa DESC;
END$$

-- Procedure 2: Department-wise stats
CREATE PROCEDURE sp_DeptStats(IN dept_name VARCHAR(100))
BEGIN
    SELECT 
        COUNT(s.id)                       AS total_students,
        SUM(p.id IS NOT NULL)             AS placed_count,
        ROUND(AVG(s.cgpa), 2)             AS avg_cgpa,
        ROUND(AVG(p.package_lpa), 2)      AS avg_package
    FROM students s
    LEFT JOIN placements p ON s.id = p.student_id
    WHERE s.department = dept_name;
END$$

-- Procedure 3: Check if student is eligible for a job
CREATE PROCEDURE sp_CheckEligibility(IN student_id INT, IN job_id INT)
BEGIN
    DECLARE student_cgpa DECIMAL(4,2);
    DECLARE student_dept VARCHAR(100);
    DECLARE job_cgpa_cutoff DECIMAL(4,2);
    DECLARE job_branch VARCHAR(100);
    
    SELECT cgpa, department INTO student_cgpa, student_dept 
    FROM students WHERE id = student_id;
    
    SELECT cgpa_cutoff, allowed_branches INTO job_cgpa_cutoff, job_branch 
    FROM jobs WHERE id = job_id;
    
    IF student_cgpa >= job_cgpa_cutoff AND FIND_IN_SET(student_dept, job_branch) > 0 THEN
        SELECT 'ELIGIBLE' AS result, student_cgpa, job_cgpa_cutoff;
    ELSE
        SELECT 'NOT ELIGIBLE' AS result, student_cgpa, job_cgpa_cutoff;
    END IF;
END$$

DELIMITER ;
```

### Create `server/routes/procedures.js`

```javascript
import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/procedures/placement-report
// Body: { graduation_year: 2025 }
router.post('/placement-report', requireAuth, async (req, res) => {
    const { graduation_year } = req.body;
    if (!graduation_year) {
        return res.status(400).json({ error: 'graduation_year is required' });
    }
    try {
        // CALL runs a stored procedure
        // [results] contains array of result sets; [0] is the first SELECT's results
        const [results] = await pool.query('CALL sp_PlacementReport(?)', [graduation_year]);
        res.json({ results: results[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/procedures/dept-stats
// Body: { department: "Computer Science" }
router.post('/dept-stats', requireAuth, async (req, res) => {
    const { department } = req.body;
    try {
        const [results] = await pool.query('CALL sp_DeptStats(?)', [department]);
        res.json({ results: results[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/procedures/check-eligibility
// Body: { student_id: 1, job_id: 3 }
router.post('/check-eligibility', requireAuth, async (req, res) => {
    const { student_id, job_id } = req.body;
    try {
        const [results] = await pool.query('CALL sp_CheckEligibility(?, ?)', [student_id, job_id]);
        res.json({ result: results[0][0] }); // first row of first result set
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
```

---

## ✅ PHASE 9: Frontend API Client

### Step 9.1 — Create `vite.config.js` (in project root)

This makes the browser automatically forward `/api` requests to your backend.  
So `fetch('/api/students')` works without CORS issues.

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true
            }
        }
    }
});
```

### Step 9.2 — Create `js/api.js`

This is your single file for all API calls. Every page module will use this.

```javascript
// js/api.js

const BASE_URL = '/api'; // proxied to http://localhost:3001

// Core fetch function — automatically adds the login token
async function request(path, options = {}) {
    const token = localStorage.getItem('placement_token');

    const response = await fetch(BASE_URL + path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            // Attach token if we have one
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...(options.headers || {})
        }
    });

    // If server says "not logged in" → force logout
    if (response.status === 401) {
        localStorage.removeItem('placement_token');
        localStorage.removeItem('placement_user');
        window.location.reload();
        return;
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }

    return data;
}

// Export simple methods for all pages to use
export const api = {
    // GET request: api.get('/students')
    get: (path) => request(path),

    // POST request: api.post('/auth/login', { username, password })
    post: (path, body) => request(path, {
        method: 'POST',
        body: JSON.stringify(body)
    }),

    // PUT request: api.put('/students/1', { status: 'Placed' })
    put: (path, body) => request(path, {
        method: 'PUT',
        body: JSON.stringify(body)
    }),

    // DELETE request: api.delete('/users/5')
    delete: (path) => request(path, { method: 'DELETE' })
};
```

### Step 9.3 — Update `js/app.js` login check

In `js/app.js`, change the `checkAuth` function to use the token:
```javascript
checkAuth() {
    const savedUser = localStorage.getItem('placement_user');
    const token = localStorage.getItem('placement_token');
    if (savedUser && token) {
        this.state.user = JSON.parse(savedUser);
        this.state.role = this.state.user.role;
        this.showPortal();
    } else {
        this.showLogin();
    }
},
```

### Step 9.4 — Update `js/auth/login.js`

Replace the fake login with a real one:
```javascript
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Logging in...';
    btn.disabled = true;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role: selectedRole })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || 'Login failed');
            btn.textContent = 'Login to Portal →';
            btn.disabled = false;
            return;
        }

        // Save token and user to localStorage
        localStorage.setItem('placement_token', data.token);
        localStorage.setItem('placement_user', JSON.stringify(data.user));

        app.checkAuth(); // takes you to the portal

    } catch (err) {
        alert('Could not connect to server. Is your backend running?');
        btn.textContent = 'Login to Portal →';
        btn.disabled = false;
    }
});
```

---

## ✅ PHASE 10: Replace Mock Data in Page Modules

### How to update `js/coordinator/students.js`

**Before (using mock data):**
```javascript
import { students } from './data.js';
export function render(container, app) {
    // students is an array from data.js
    renderPage(container);
}
```

**After (using real API):**
```javascript
import { api } from '../api.js';

export async function render(container, app) {
    // Show a loading spinner first
    container.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:60vh;">
            <div style="text-align:center;">
                <ion-icon name="sync-outline" style="font-size:3rem;color:var(--primary);animation:spin 1s linear infinite;"></ion-icon>
                <p style="color:var(--text-muted);margin-top:16px;">Loading students...</p>
            </div>
        </div>
    `;

    try {
        // Fetch real data from your backend
        const students = await api.get('/students');
        // Now render with real data (rest of your render code stays the same)
        renderPage(container, students);
    } catch (err) {
        container.innerHTML = `<div class="card"><p style="color:red;">Error: ${err.message}</p></div>`;
    }
}
```

Do this same pattern for every page module — just change the API endpoint.

---

## ✅ PHASE 11: Normalization Page

### What is Normalization?
Normalization is organizing your database to **reduce data duplication** and improve data integrity.

**The 3 levels you need to show:**

**1NF — First Normal Form (Atomic Values)**
- Every column must hold ONE piece of data only
- No arrays or comma-separated values in cells

❌ BAD (not 1NF):
```
| student_id | name   | skills            |
|------------|--------|-------------------|
| 1          | Riddhi | React, SQL, Node  |  ← skills is a list!
```

✅ GOOD (1NF):
```
| student_id | name   |       | student_id | skill |
|------------|--------|       |------------|-------|
| 1          | Riddhi |       | 1          | React |
                               | 1          | SQL   |
                               | 1          | Node  |
```

**2NF — Second Normal Form (No Partial Dependency)**
- Every non-key column must depend on the WHOLE primary key, not just part of it
- Only applies when you have a composite primary key

2NF Example with composite key (`student_id + job_id`):

❌ BAD: Company name depends only on `job_id`, not the full composite key
```
applications: (student_id, job_id, company_name, status)
```
✅ GOOD: Company name stays in the `jobs` table; applications only stores the reference
```
applications: (student_id, job_id, status)
jobs: (job_id, company_name, role)
```

**3NF — Third Normal Form (No Transitive Dependency)**
- No non-key column should depend on another non-key column

❌ BAD: `hod_name` depends on `department`, not on `student_id`
```
students: (id, name, department, hod_name)
```
✅ GOOD: Separate the transitive dependency
```
students: (id, name, dept_id)
departments: (id, dept_name, hod_name)
```

### Create `js/admin/normalization.js`

```javascript
// js/admin/normalization.js — Shows database normalization concepts

export function render(container, app) {
    container.innerHTML = `
        <div class="dashboard-header" style="margin-bottom: 32px;">
            <h1 style="font-size: 2rem; color: var(--primary);">Database Normalization</h1>
            <p style="color: var(--text-muted);">How our database is structured to avoid redundancy and ensure integrity</p>
        </div>

        <!-- 1NF -->
        <div class="card" style="margin-bottom: 24px;">
            <h2 style="color: var(--primary); margin-bottom: 8px;">1NF — First Normal Form</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">Every column stores atomic (single) values. No comma-separated lists.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
                <div>
                    <p style="color:#ef4444;font-weight:700;margin-bottom:8px;">❌ Before 1NF (Bad)</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#fef2f2;">
                            <th style="padding:8px;border:1px solid #fecaca;text-align:left;">student_id</th>
                            <th style="padding:8px;border:1px solid #fecaca;text-align:left;">name</th>
                            <th style="padding:8px;border:1px solid #fecaca;text-align:left;background:#fee2e2;">skills (❌ list!)</th>
                        </tr></thead>
                        <tbody>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">Riddhi</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">React, SQL, Node</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">2</td><td style="padding:8px;border:1px solid #e2e8f0;">Alex</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Python, Docker</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p style="color:#10b981;font-weight:700;margin-bottom:8px;">✅ After 1NF (Good)</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;text-align:left;">student_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;text-align:left;">skill</th>
                        </tr></thead>
                        <tbody>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">React</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">SQL</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">Node.js</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">2</td><td style="padding:8px;border:1px solid #e2e8f0;">Python</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- 2NF -->
        <div class="card" style="margin-bottom: 24px;">
            <h2 style="color: var(--primary); margin-bottom: 8px;">2NF — Second Normal Form</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">No partial dependencies. Every column depends on the FULL primary key.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
                <div>
                    <p style="color:#ef4444;font-weight:700;margin-bottom:8px;">❌ Before 2NF</p>
                    <p style="font-size:0.8rem;color:#94a3b8;margin-bottom:8px;">composite key: (student_id, job_id)</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#fef2f2;">
                            <th style="padding:8px;border:1px solid #fecaca;">student_id</th>
                            <th style="padding:8px;border:1px solid #fecaca;">job_id</th>
                            <th style="padding:8px;border:1px solid #fecaca;background:#fee2e2;">company_name ❌</th>
                            <th style="padding:8px;border:1px solid #fecaca;">status</th>
                        </tr></thead>
                        <tbody>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">101</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Google</td><td style="padding:8px;border:1px solid #e2e8f0;">Applied</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">2</td><td style="padding:8px;border:1px solid #e2e8f0;">101</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Google</td><td style="padding:8px;border:1px solid #e2e8f0;">Selected</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p style="color:#10b981;font-weight:700;margin-bottom:8px;">✅ After 2NF</p>
                    <p style="font-size:0.8rem;color:#94a3b8;margin-bottom:8px;">company moved to jobs table</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;margin-bottom:8px;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;">student_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">job_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">status</th>
                        </tr></thead>
                        <tbody><tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">101</td><td style="padding:8px;border:1px solid #e2e8f0;">Applied</td></tr></tbody>
                    </table>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;">job_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">company_name ✅</th>
                        </tr></thead>
                        <tbody><tr><td style="padding:8px;border:1px solid #e2e8f0;">101</td><td style="padding:8px;border:1px solid #e2e8f0;">Google</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- 3NF -->
        <div class="card" style="margin-bottom: 24px;">
            <h2 style="color: var(--primary); margin-bottom: 8px;">3NF — Third Normal Form</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">No transitive dependencies. Non-key columns must depend only on the primary key.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
                <div>
                    <p style="color:#ef4444;font-weight:700;margin-bottom:8px;">❌ Before 3NF</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#fef2f2;">
                            <th style="padding:8px;border:1px solid #fecaca;">id</th>
                            <th style="padding:8px;border:1px solid #fecaca;">name</th>
                            <th style="padding:8px;border:1px solid #fecaca;">department</th>
                            <th style="padding:8px;border:1px solid #fecaca;background:#fee2e2;">hod_name ❌</th>
                        </tr></thead>
                        <tbody>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">Riddhi</td><td style="padding:8px;border:1px solid #e2e8f0;">CSE</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Dr. Mehta</td></tr>
                            <tr><td style="padding:8px;border:1px solid #e2e8f0;">2</td><td style="padding:8px;border:1px solid #e2e8f0;">Alex</td><td style="padding:8px;border:1px solid #e2e8f0;">CSE</td><td style="padding:8px;border:1px solid #e2e8f0;color:#ef4444;">Dr. Mehta</td></tr>
                        </tbody>
                    </table>
                    <p style="font-size:0.8rem;color:#94a3b8;margin-top:8px;">hod_name depends on department, not on student id</p>
                </div>
                <div>
                    <p style="color:#10b981;font-weight:700;margin-bottom:8px;">✅ After 3NF</p>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;margin-bottom:8px;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;">id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">name</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">dept_id ✅</th>
                        </tr></thead>
                        <tbody><tr><td style="padding:8px;border:1px solid #e2e8f0;">1</td><td style="padding:8px;border:1px solid #e2e8f0;">Riddhi</td><td style="padding:8px;border:1px solid #e2e8f0;">10</td></tr></tbody>
                    </table>
                    <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                        <thead><tr style="background:#f0fdf4;">
                            <th style="padding:8px;border:1px solid #bbf7d0;">dept_id</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">dept_name</th>
                            <th style="padding:8px;border:1px solid #bbf7d0;">hod_name ✅</th>
                        </tr></thead>
                        <tbody><tr><td style="padding:8px;border:1px solid #e2e8f0;">10</td><td style="padding:8px;border:1px solid #e2e8f0;">CSE</td><td style="padding:8px;border:1px solid #e2e8f0;">Dr. Mehta</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Our Schema -->
        <div class="card">
            <h2 style="color: var(--primary); margin-bottom: 8px;">Our Database Schema (3NF Compliant)</h2>
            <p style="color: var(--text-muted); margin-bottom: 24px;">All tables in our system satisfy 1NF, 2NF, and 3NF</p>
            <div style="display:flex;gap:16px;flex-wrap:wrap;">
                ${renderSchemaTable('students', ['id (PK)', 'name', 'roll_no', 'cgpa', 'dept_id (FK)', 'coordinator_id (FK)'])}
                ${renderSchemaTable('departments', ['id (PK)', 'dept_name', 'hod_name'])}
                ${renderSchemaTable('coordinators', ['id (PK)', 'name', 'dept_id (FK)'])}
                ${renderSchemaTable('companies', ['id (PK)', 'name', 'industry', 'tier'])}
                ${renderSchemaTable('jobs', ['id (PK)', 'company_id (FK)', 'role', 'package', 'cgpa_cutoff'])}
                ${renderSchemaTable('applications', ['id (PK)', 'student_id (FK)', 'job_id (FK)', 'status', 'applied_date'])}
                ${renderSchemaTable('placements', ['id (PK)', 'student_id (FK)', 'company_id (FK)', 'package_lpa', 'offer_date'])}
                ${renderSchemaTable('student_skills', ['id (PK)', 'student_id (FK)', 'skill'])}
            </div>
        </div>
    `;
}

function renderSchemaTable(name, columns) {
    return `
        <div style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;min-width:160px;flex:1;">
            <div style="background:var(--primary);color:white;padding:10px 14px;font-weight:700;font-size:0.85rem;">${name}</div>
            <div>
                ${columns.map(col => `
                    <div style="padding:8px 14px;font-size:0.8rem;border-bottom:1px solid #f1f5f9;
                        color:${col.includes('PK') ? '#1B3A6B' : col.includes('FK') ? '#f59e0b' : '#475569'};
                        font-weight:${col.includes('PK') || col.includes('FK') ? '700' : '400'};">
                        ${col}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
```

---

## ✅ PHASE 12: Update Scripts & Run Everything

### Update root `package.json`:
```json
{
  "name": "student_placement_cell_database_management_system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "server": "node server/index.js",
    "start": "concurrently \"npm run dev\" \"npm run server\""
  },
  "devDependencies": {
    "vite": "^8.0.8",
    "concurrently": "^8.2.0"
  }
}
```

### How to start the full app:
```bash
# Start BOTH frontend and backend at the same time
npm run start

# OR start them separately in 2 terminals:
# Terminal 1:
npm run dev          # starts Vite on http://localhost:5173

# Terminal 2:
cd server
node index.js        # starts Express on http://localhost:3001
```

---

## 🔒 SPACE EFFICIENCY (How We Avoid Wasting Storage)

1. **Foreign Keys instead of duplicating data**
   - Instead of storing company name in every application row → store `company_id`
   - One row change in `companies` updates everywhere

2. **Separate skills table (1NF)**
   - Instead of `skills: "React, SQL, Node"` → `student_skills` table
   - Enables querying: "find all React developers"

3. **Views instead of repeated JOINs**
   - Complex JOINs run once as a view → query the view like a table
   - No repeated complex SQL in your app code

4. **Connection pooling in `db.js`**
   - Only 10 MySQL connections shared → doesn't exhaust DB memory
   - Each request borrows a connection and returns it

5. **JWT instead of sessions**
   - No need to store session data on the server
   - Token is self-contained and verified cryptographically

---

## 📋 FULL CHECKLIST

```
BACKEND SETUP
[ ] Created server/ folder
[ ] Created server/.env with DB credentials
[ ] Ran: cd server && npm install express mysql2 dotenv cors jsonwebtoken
[ ] Created server/db.js
[ ] Created server/index.js
[ ] Created server/middleware/auth.js

ROUTES
[ ] Created server/routes/auth.js
[ ] Created server/routes/students.js
[ ] Created server/routes/companies.js
[ ] Created server/routes/applications.js
[ ] Created server/routes/analytics.js  (JOINs)
[ ] Created server/routes/views.js
[ ] Created server/routes/procedures.js

MYSQL SETUP
[ ] Created users table
[ ] Created vw_placed_students view
[ ] Created vw_active_applications view
[ ] Created vw_company_stats view
[ ] Created vw_unplaced_students view
[ ] Created sp_PlacementReport procedure
[ ] Created sp_DeptStats procedure
[ ] Created sp_CheckEligibility procedure

FRONTEND
[ ] Created vite.config.js with proxy
[ ] Created js/api.js
[ ] Updated js/app.js checkAuth() to use token
[ ] Updated js/auth/login.js to call /api/auth/login
[ ] Replaced data.js imports in coordinator pages
[ ] Created js/admin/normalization.js page

TESTING
[ ] http://localhost:3001/api/health returns { status: 'ok' }
[ ] Login works with real DB credentials
[ ] Students page loads from database
[ ] Analytics shows JOIN results
[ ] Views explorer shows view data
[ ] Procedures panel runs stored procedures
[ ] Normalization page renders all 3NF tables
```

---

*This plan was auto-generated for Student Placement Cell Database Management System*  
*Project: riddhi-sharma10/Student_Placement_Cell_Database_Management_System*
