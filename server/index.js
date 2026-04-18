// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// MIDDLEWARE (things that run before every request)
app.use(cors({
    origin: (origin, callback) => {
        const allowed = !origin || /^(http:\/\/localhost:\d+|http:\/\/127\.0\.0\.1:\d+)$/.test(origin);
        callback(null, allowed);
    }
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
import jobsRouter from './routes/jobs.js';
import adminRouter from './routes/admin.js';
import resumesRouter from './routes/resumes.js';
import coordinatorRouter from './routes/coordinator.js';

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
app.use('/api/jobs', jobsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/resumes', resumesRouter);
app.use('/api/coordinator', coordinatorRouter);

// Health check (open this in browser to test: http://localhost:3001/api/health)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running!' });
});

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
