// server/routes/auth.js — UPDATED WITH HASHING SUPPORT
import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import crypto from 'crypto';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body; 
    console.log(`Login attempt for: ${username}`);

    try {
        // 1. Check USER_ROLE table
        const [users] = await pool.query(
            'SELECT * FROM USER_ROLE WHERE username = ?', 
            [username]
        );

        if (users.length === 0) {
            console.log(`User not found: ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
        
        console.log(`DB Hash: ${user.password_hash}`);
        console.log(`In Hash: ${hashedInput}`);

        // 3. Compare hashes
        if (user.password_hash !== hashedInput && user.password_hash !== password) {
             // Fallback to literal comparison just in case some are plain text
             return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 4. Fetch specific details (Name) based on role
        let displayName = user.username;
        if (user.role === 'student' && user.entity_id) {
            const [details] = await pool.query('SELECT s_name FROM STUDENT WHERE s_id = ?', [user.entity_id]);
            if (details.length > 0) displayName = details[0].s_name;
        } else if ((user.role === 'coordinator' || user.role === 'admin') && user.entity_id) {
            const [details] = await pool.query('SELECT name FROM CGDC_ADMIN WHERE cgdc_id = ?', [user.entity_id]);
            if (details.length > 0) displayName = details[0].name;
        }

        // 5. Generate Token
        const token = jwt.sign(
            { id: user.user_id, role: user.role, entityId: user.entity_id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.user_id,
                name: displayName,
                role: user.role,
                entityId: user.entity_id
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
