const express = require("express");
const router = express.Router();
const prisma = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const adminOnly = require("../middleware/adminOnly");

// GET active coaches
router.get("/", async (req, res) => {
  const coaches = await prisma.coach.findMany({ where: { isActive: true } });
  res.json(coaches);
});

// POST coach (admin only)
router.post("/", verifyToken, adminOnly, async (req, res) => {
  const { name, price } = req.body;
  const coach = await prisma.coach.create({ data: { name, price } });
  res.json({ message: "Coach added", coach });
});

module.exports = router;
