const jwt = require('jsonwebtoken');
const SECRET_KEY = "mysecretkey";

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.json({ message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.json({ message: 'Token missing' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.json({ message: 'Invalid token' });
    }
};
