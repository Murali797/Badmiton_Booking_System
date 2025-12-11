const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');

// Simple test route
router.get('/', (req, res) => {
  res.json({ message: "Bookings endpoint working!" });
});

router.post('/', createBooking);
router.get('/:userEmail', getUserBookings);

module.exports = router;
