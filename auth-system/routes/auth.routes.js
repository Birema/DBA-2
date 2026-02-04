const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/register', async (req, res) => {
    const { username, password, role, department } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (username, password, role, department) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, role, department]
        );
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Registration failed", details: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user.id, role: user.role, department: user.department },
                process.env.JWT_SECRET, { expiresIn: '1h' }
            );
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;