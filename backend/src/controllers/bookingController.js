// backend/src/controllers/bookingController.js
const prisma = require("../config/db");

// ------------------------------
// PRICE CALCULATION
// ------------------------------
const calculatePrice = async ({ court, coach, equipments, startTime }) => {
  let total = court.basePrice;
  const breakdown = {
    baseCourt: court.basePrice,
    rules: [],
    coach: 0,
    equipments: []
  };

  const date = new Date(startTime);
  const hour = date.getHours();
  const day = date.getDay(); // 0 = Sunday

  const rules = await prisma.pricingRule.findMany({ where: { isActive: true } });

  for (const r of rules) {
    if (r.type === "peak" && hour >= r.startHour && hour < r.endHour) {
      total *= r.multiplier || 1;
      breakdown.rules.push({ name: r.name, multiplier: r.multiplier });
    }

    if (r.type === "weekend" && r.daysOfWeek.includes(day)) {
      total *= r.multiplier || 1;
      breakdown.rules.push({ name: r.name, multiplier: r.multiplier });
    }

    if (r.type === "court_type" && r.courtType === court.type) {
      const m = r.multiplier || 1;
      const s = r.surcharge || 0;
      total = total * m + s;
      breakdown.rules.push({ name: r.name, multiplier: m, surcharge: s });
    }
  }

  if (coach) {
    total += coach.price;
    breakdown.coach = coach.price;
  }

  for (const eq of equipments) {
    const price = eq.price * eq.quantity;
    total += price;
    breakdown.equipments.push({
      name: eq.name,
      price: eq.price,
      quantity: eq.quantity
    });
  }

  return { total, breakdown };
};

// ------------------------------
// CREATE BOOKING
// ------------------------------
exports.createBooking = async (req, res) => {
  const { userEmail, courtId, coachId, equipments = [], startTime, endTime } = req.body;

  if (!userEmail || !courtId || !startTime || !endTime)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    // 1️⃣ Find userId using email
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) return res.status(400).json({ error: "User not found" });

    // 2️⃣ Get court
    const court = await prisma.court.findUnique({ where: { id: courtId } });
    if (!court) return res.status(400).json({ error: "Court not found" });

    // 3️⃣ Get coach
    let coach = null;
    if (coachId) {
      coach = await prisma.coach.findUnique({ where: { id: coachId } });
      if (!coach) return res.status(400).json({ error: "Coach not found" });
    }

    // 4️⃣ Prepare equipment list
    const equipmentList = [];
    for (const e of equipments) {
      const eq = await prisma.equipment.findUnique({ where: { id: e.equipmentId } });
      if (!eq) return res.status(400).json({ error: `Equipment ${e.equipmentId} not found` });
      equipmentList.push({ ...eq, quantity: e.quantity });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    // 5️⃣ Check court availability
    const courtBusy = await prisma.booking.findFirst({
      where: {
        courtId,
        startTime: { lt: end },
        endTime: { gt: start }
      }
    });
    if (courtBusy) return res.status(400).json({ error: "Court already booked for this time" });

    // 6️⃣ Check coach availability
    if (coachId) {
      const coachBusy = await prisma.booking.findFirst({
        where: {
          coachId,
          startTime: { lt: end },
          endTime: { gt: start }
        }
      });
      if (coachBusy) return res.status(400).json({ error: "Coach booked for this time" });
    }

    // 7️⃣ Check equipment quantities
    for (const eq of equipmentList) {
      const used = await prisma.bookingEquipment.aggregate({
        _sum: { quantity: true },
        where: {
          equipmentId: eq.id,
          booking: {
            startTime: { lt: end },
            endTime: { gt: start }
          }
        }
      });

      const usedQty = used._sum.quantity || 0;
      if (usedQty + eq.quantity > eq.totalQuantity)
        return res.status(400).json({ error: `${eq.name} not available in required quantity` });
    }

    // 8️⃣ Calculate pricing
    const { total, breakdown } = await calculatePrice({
      court,
      coach,
      equipments: equipmentList,
      startTime,
      endTime
    });

    // 9️⃣ Create booking transaction
    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId: user.id,
          courtId,
          coachId: coachId || null,
          startTime,
          endTime,
          totalPrice: total,
          priceBreakdown: breakdown
        }
      });

      for (const eq of equipmentList) {
        await tx.bookingEquipment.create({
          data: {
            bookingId: newBooking.id,
            equipmentId: eq.id,
            quantity: eq.quantity
          }
        });
      }

      return newBooking;
    });

    res.json({ message: "Booking successful", booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// ------------------------------
// GET USER BOOKINGS
// ------------------------------
exports.getUserBookings = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        court: true,
        coach: true,
        equipments: { include: { equipment: true } }
      }
    });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
