const jwt = require('jsonwebtoken');
const users = []; 
const SECRET_KEY = "mysecretkey";

exports.register = (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find(u => u.username === username);
    if (userExists) return res.json({ message: 'User already exists' });

    users.push({ username, password });
    res.json({ message: 'User registered successfully' });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.json({ message: 'Invalid credentials' });
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};
