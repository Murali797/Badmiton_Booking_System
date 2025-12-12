// controllers/ruleController.js
const prisma = require('../config/db');


const getAll = async (req, res) => {
  try {
    const rules = await prisma.pricingRule.findMany({
      where: { isActive: true }
    });
    res.json(rules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const create = async (req, res) => {
  try {
    const rule = await prisma.pricingRule.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        multiplier: req.body.multiplier || null,
        surcharge: req.body.surcharge || null,
        startHour: req.body.startHour || null,
        endHour: req.body.endHour || null,
        daysOfWeek: req.body.daysOfWeek || [],
        courtType: req.body.courtType || null,
        isActive: true
      }
    });
    res.status(201).json(rule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const update = async (req, res) => {
  const { id } = req.params;
  try {
    const rule = await prisma.pricingRule.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(rule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pricingRule.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    });
    res.json({ message: "Rule disabled" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove
};