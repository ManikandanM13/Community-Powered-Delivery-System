import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Route to add a new order
router.post('/add-order', async (req, res) => {
    const { hostName, contactNumber, pickup, dropoff, size, vehicle, handleWithCare } = req.body;

    // Validate input data
    if (!hostName || !contactNumber || !pickup || !dropoff || !size || !vehicle || !handleWithCare) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Create a new order
        const newOrder = new Order({
            hostName,
            contactNumber,
            pickup,
            dropoff,
            size,
            vehicle,
            handleWithCare,
        });

        // Save the order to the database
        await newOrder.save();
        res.status(201).json({ message: "Order posted successfully", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server error. Could not create order." });
    }
});

// Other order-related routes can go here

export default router;
