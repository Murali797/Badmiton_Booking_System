// src/config/db.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("PostgreSQL Connected Successfully");
    const courts = await prisma.court.findMany();
    console.log("Courts in DB:", courts);
  } catch (err) {
    console.log("Connection failed:", err.message);
  }
}

testConnection();

module.exports = prisma;