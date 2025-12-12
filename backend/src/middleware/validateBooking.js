// middleware/validateBooking.js
const prisma = require("../config/db");

module.exports = async (req, res, next) => {
  try {
    const { courtId, startTime, endTime } = req.body;

    if (!courtId || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      return res.status(400).json({ error: "End time must be after start time" });
    }

  
    const court = await prisma.court.findUnique({ where: { id: courtId } });
    if (!court) return res.status(400).json({ error: "Court not found" });

    
    const overlaps = await prisma.booking.findFirst({
      where: {
        courtId,
        OR: [
          {
            startTime: { lte: end },
            endTime: { gte: start }
          }
        ]
      }
    });

    if (overlaps) {
      return res.status(400).json({ error: "Court already booked in this time slot" });
    }

    next();
  } catch (err) {
    next(err);
  }
};
