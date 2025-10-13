import express from "express";
import { generate_map } from "../services/generate_map.js";

const router = express.Router();

router.post("/matching-deliveries", async (req, res) => {
  const { start, destination } = req.body;
  const saved_at = await generate_map(start, destination);
  res.status(201).json({ location: saved_at });
});

export default router;
