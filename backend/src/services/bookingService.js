const prisma = require("../config/db");
const pricingEngine = require("./pricingEngine");

async function createBooking(body) {
  const { userEmail, courtId, coachId, startTime, endTime, equipments = [] } = body;

  // 1️⃣ Get the user from email
  const user = await prisma.user.findUnique({
    where: { email: userEmail }
  });

  if (!user) throw new Error("User not found");

  // 2️⃣ Court lookup
  const court = await prisma.court.findUnique({ where: { id: courtId } });
  if (!court) throw new Error("Court not found");

  // 3️⃣ Coach lookup
  const coach = coachId
    ? await prisma.coach.findUnique({ where: { id: coachId } })
    : null;

  // 4️⃣ Equipment lookup
  const equipmentRecords = [];
  const equipmentDetails = [];

  for (const item of equipments) {
    const eq = await prisma.equipment.findUnique({ where: { id: item.equipmentId } });
    equipmentDetails.push({ equipment: eq, quantity: item.quantity });

    equipmentRecords.push({
      equipmentId: eq.id,
      quantity: item.quantity
    });
  }

  // 5️⃣ Pricing rules
  const pricingRules = await prisma.pricingRule.findMany({
    where: { isActive: true }
  });

  const start = new Date(startTime);
  const end = new Date(endTime);

  const { total, breakdown } = pricingEngine({
    court,
    coach,
    equipments: equipmentDetails,
    pricingRules,
    start,
    end
  });

  // 6️⃣ Create booking (now using userId)
  const booking = await prisma.booking.create({
    data: {
      userId: user.id,                // ✅ Correct
      courtId,
      coachId: coachId || null,
      startTime: start,
      endTime: end,
      totalPrice: total,
      priceBreakdown: breakdown,
      equipments: {
        create: equipmentRecords
      }
    },
    include: {
      court: true,
      coach: true,
      equipments: { include: { equipment: true } }
    }
  });

  return booking;
}

module.exports = { createBooking };
