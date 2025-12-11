// controllers/coachController.js
const prisma = require('../config/db');

const getAll = async (req, res) => {
  const coaches = await prisma.coach.findMany({ where: { isActive: true } });
  res.json(coaches);
};

module.exports = { getAll };