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
