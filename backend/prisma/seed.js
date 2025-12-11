// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await prisma.court.createMany({
    data: [
      { name: "Indoor Court 1", type: "indoor", basePrice: 35 },
      { name: "Indoor Court 2", type: "indoor", basePrice: 35 },
      { name: "Outdoor Court 1", type: "outdoor", basePrice: 20 },
      { name: "Outdoor Court 2", type: "outdoor", basePrice: 20 },
    ],
    skipDuplicates: true
  });

  await prisma.equipment.createMany({
    data: [
      { name: "Yonex Racket", totalQuantity: 20, price: 8 },
      { name: "Badminton Shoes", totalQuantity: 12, price: 10 },
    ],
    skipDuplicates: true
  });

  await prisma.coach.createMany({
    data: [
      { name: "Coach Vikram", price: 30 },
      { name: "Coach Sneha", price: 35 },
      { name: "Coach Arjun", price: 28 },
    ],
    skipDuplicates: true
  });

  await prisma.pricingRule.createMany({
    data: [
      { name: "Peak Hours", type: "peak", multiplier: 1.5, startHour: 18, endHour: 21 },
      { name: "Weekend Surcharge", type: "weekend", surcharge: 15, daysOfWeek: [0, 6] },
      { name: "Indoor Premium", type: "court_type", multiplier: 1.2, courtType: "indoor" },
    ],
    skipDuplicates: true
  });

  console.log("Seed done. All data inserted!");
  process.exit(0);
}

seed();
