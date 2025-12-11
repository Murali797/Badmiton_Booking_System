// controllers/courtController.js
const prisma = require('../config/db');

const getAll = async (req, res) => {
  const courts = await prisma.court.findMany({ where: { isActive: true } });
  res.json(courts);
};

module.exports = { getAll };