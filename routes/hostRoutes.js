import express from 'express';
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
});

export default router;
