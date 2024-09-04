import express from 'express';
import bcrypt from 'bcryptjs';
import Host from '../models/Host.js'; // Adjust the path to your model

const router = express.Router();

// Example route for registering a host
router.post('/register', async (req, res) => {
    try {
        const newHost = new Host(req.body);
        await newHost.save();
        res.status(201).json({ message: 'Host registered successfully', host: newHost });
    } catch (error) {
        res.status(500).json({ message: 'Error registering host', error });
    }
})

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        // Find the user by name
        const host = await Host.findOne({ name });
        if (!host) {
            return res.status(401).json({ message: 'Invalid name or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, host.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid name or password' });
        }

        // If credentials are correct, you can return a token or success message
        res.status(200).json({ message: 'Login successful', host });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
);

export default router;
