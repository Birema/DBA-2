const express = require('express');
const router = express.Router();
const db = require('../db');

// Import Middlewares
const authenticate = require('../middleware/auth.middleware');
const abac = require('../middleware/abac.middleware');
const { authorize } = require('../middleware/role.middleware');
const ownership = require('../middleware/ownership.middleware');
const customRules = require('../middleware/customRules.middleware');

/**
 * Step 8: ABAC Route
 * This MUST come before /:id routes
 */
router.get('/finance', authenticate, abac('Finance'), (req, res) => {
    res.json({ 
        message: "Access Granted", 
        detail: "Welcome to the Finance Department restricted area." 
    });
});

// Step 9: PUT - Ownership check
router.put('/:id', authenticate, ownership, async (req, res) => {
    const { username, department } = req.body;
    try {
        await db.query('UPDATE users SET username = ?, department = ? WHERE id = ?', 
            [username, department, req.params.id]);
        res.json({ message: "Update success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Step 7 & 10: DELETE - Admin only + Working hours
router.delete('/:id', authenticate, authorize(['admin']), customRules, async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;