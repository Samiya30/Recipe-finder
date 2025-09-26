const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.json({ message: 'Access denied, token missing' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.json({ message: 'Invalid token' });
    }
};
module.exports = authMiddleware;
