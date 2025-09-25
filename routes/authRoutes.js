const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.json({ msg: 'Please enter all fields' });

    const existingUser = await User.findOne({ username });
    if(existingUser) return res.json({ msg: 'Username already exists' });

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ msg: 'Registration successful' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.json({ msg: 'Please enter all fields' });

    const user = await User.findOne({ username, password });
    if(!user) return res.json({ msg: 'Invalid username or password' });

    res.json({ msg: 'Login successful', user });
});

module.exports = router;
