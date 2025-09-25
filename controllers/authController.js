const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = 'mysecretkey';

// Register
exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'All fields required' });

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'User registered successfully' });
};

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};
