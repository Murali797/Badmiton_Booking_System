const express = require("express");
const router = express.Router();
const prisma = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const adminOnly = require("../middleware/adminOnly");

// GET all equipment
router.get("/", async (req, res) => {
  const equipment = await prisma.equipment.findMany();
  res.json(equipment);
});

// POST equipment (admin only)
router.post("/", verifyToken, adminOnly, async (req, res) => {
  const { name, price, totalQuantity } = req.body;
  const eq = await prisma.equipment.create({ data: { name, price, totalQuantity } });
  res.json({ message: "Equipment added", eq });
});

module.exports = router;
