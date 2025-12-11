// controllers/pricingController.js
const prisma = require('../config/db');

const getAll = async (req, res) => {
  const rules = await prisma.pricingRule.findMany();
  res.json(rules);
};

const create = async (req, res) => {
  const rule = await prisma.pricingRule.create({ data: req.body });
  res.status(201).json(rule);
};

const update = async (req, res) => {
  const { id } = req.params;
  const rule = await prisma.pricingRule.update({
    where: { id: parseInt(id) },
    data: req.body
  });
  res.json(rule);
};

module.exports = { getAll, create, update };