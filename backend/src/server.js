// backend/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const prisma = require('./config/db');

// Custom Middlewares
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.json({ message: "Badminton Booking API is LIVE" });
});

// API Routes
app.use('/api/courts', require('./routes/courts'));
app.use('/api/coaches', require('./routes/coaches'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/pricingRules', require('./routes/pricingRules'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/auth', require('./routes/auth'));

// Error Handler (must be LAST)
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API ready`);
});

module.exports = app;
