// const express = require('express');
// const bcrypt = require('bcryptjs'); // Assuming you are hashing passwords
// const Host = require('./models/Host'); // Adjust the path based on your project structure
// const router = express.Router();
// router.post('/login', async (req, res) => {
//     const { name, password } = req.body;
//     try {
//         // Find the user by name
//         const host = await Host.findOne({ name });
//         if (!host) {
//             return res.status(400).json({ message: 'Invalid name or password' });
//         }
//         // Check if the password matches
//         const isMatch = await bcrypt.compare(password, host.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid name or password' });
//         }
//         // If credentials are correct, you can return a token or success message
//         res.status(200).json({ message: 'Login successful', host });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });
// module.exports = router;
"use strict";