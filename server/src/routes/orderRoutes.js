import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Route to add a new order
router.post("/add-order", async (req, res) => {
  const {
    hostName,
    contactNumber,
    pickup,
    dropoff,
    size,
    vehicle,
    handleWithCare,
  } = req.body;

  // Validate input data
  if (
    !hostName ||
    !contactNumber ||
    !pickup ||
    !dropoff ||
    !size ||
    !vehicle ||
    !handleWithCare
  ) {
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
    res
      .status(201)
      .json({ message: "Order posted successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error. Could not create order." });
  }
});

// Other order-related routes can go here

// Other order-related routes can go here

// Route to get all orders posted by a specific host
router.get("/", async (req, res) => {
  const { hostName } = req.query;

  if (!hostName) {
    return res.status(400).json({ message: "Host name is required" });
  }

  try {
    const orders = await Order.find({ hostName });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error. Could not fetch orders." });
  }
});


// DELETE order by ID
router.delete('/:id', async (req, res) => {
  try {
      const orderId = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      if (!deletedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Failed to delete order' });
  }
});


export default router;
