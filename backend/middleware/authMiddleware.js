const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        let token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Handle Bearer token format
        if (token.startsWith('Bearer ')) {
            token = token.slice(7).trim();
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please log in again.' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Invalid token. Please log in again.' });
        } else {
            return res.status(500).json({ message: 'Authentication failed. Try again later.' });
        }
    }
};

module.exports = authenticate;
