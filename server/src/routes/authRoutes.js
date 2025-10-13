import express from "express";
import bcrypt from "bcryptjs";
import Host from "../models/Host.js"; // Adjust the path to your model
import DP from "../models/DP.js"; // DP Model

const router = express.Router();

// Host Registration Route
router.post("/register", async (req, res) => {
  try {
    const newHost = new Host(req.body);
    await newHost.save();
    res
      .status(201)
      .json({ message: "Host registered successfully", host: newHost });
  } catch (error) {
    res.status(500).json({ message: "Error registering host", error });
  }
});

// Host Login Route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const host = await Host.findOne({ name });
    if (!host) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    const isMatch = await bcrypt.compare(password, host.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    // Store user information in session
    req.session.hostId = host._id;  // Save host ID in session
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
        return res.status(500).json({ message: "Error saving session" });
      }
      res.status(200).json({ message: "Login successful", host });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
    console.error(err);
  }
});


router.post("/dpregister", async (req, res) => {
  const hostId = req.session.hostId; // Ensure the host is logged in
  console.log("Session hostId:", req.session.hostId);
  if (!hostId) {
    return res.status(401).json({ message: "Host not logged in" });
  }

  try {
    const host = await Host.findById(hostId);
    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }

    // Create DP registration details
    const dpData = new DP({
      dpName: req.body.dpName,         // Added dpName field
      password: req.body.password,     // Added password field (you may want to hash this)
      DLNumber: req.body.DLNumber,     // DLNumber from frontend
      RCNumber: req.body.RCNumber,     // RCNumber from frontend
      hostId: hostId,                  // Associate DP with the Host
    });

    await dpData.save();
    res.status(201).json({ message: "DP Registration successful", dpData });
  } catch (error) {
    console.error("Error registering DP:", error);
    res.status(500).json({ message: "Error registering DP", error: error.message });
  }
});


// DP Login Route
router.post("/dplogin", async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find DP by dpName (username)
    const dp = await DP.findOne({ dpName: name });
    if (!dp) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, dp.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Store DP information in session (if needed, adjust based on your session setup)
    req.session.dpId = dp._id;
    req.session.save();

    // Respond with DP information
    res.status(200).json({ message: "Login successful", dp });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
    console.error(err);
  }
});



export default router;
