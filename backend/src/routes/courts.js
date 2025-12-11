const express = require("express");
const router = express.Router();
const prisma = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const adminOnly = require("../middleware/adminOnly");

// GET courts
router.get("/", async (req, res) => {
  const courts = await prisma.court.findMany();
  res.json(courts);
});

// POST court (admin only)
router.post("/", verifyToken, adminOnly, async (req, res) => {
  const { name, type, basePrice } = req.body;
  const court = await prisma.court.create({ data: { name, type, basePrice: basePrice || 20 } });
  res.json({ message: "Court created", court });
});

module.exports = router;
