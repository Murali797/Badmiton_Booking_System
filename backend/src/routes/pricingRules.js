const express = require("express");
const router = express.Router();
const prisma = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const adminOnly = require("../middleware/adminOnly");

// GET all pricing rules
router.get("/", async (req, res) => {
  const rules = await prisma.pricingRule.findMany();
  res.json(rules);
});

// POST rule (admin only)
router.post("/", verifyToken, adminOnly, async (req, res) => {
  const rule = await prisma.pricingRule.create({ data: req.body });
  res.json({ message: "Rule added", rule });
});

module.exports = router;
