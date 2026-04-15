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
