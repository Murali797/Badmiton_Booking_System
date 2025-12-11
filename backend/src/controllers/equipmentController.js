// controllers/equipmentController.js
const prisma = require('../config/db');

const getAll = async (req, res) => {
  const equipment = await prisma.equipment.findMany();
  res.json(equipment);
};

module.exports = { getAll };