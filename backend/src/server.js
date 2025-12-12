// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const prisma = require('./config/db'); 
const errorHandler = require('./middleware/errorHandler');

const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: "Badminton Booking API is LIVE" });
});


app.use('/api/courts', require('./routes/courts'));
app.use('/api/coaches', require('./routes/coaches'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/pricingRules', require('./routes/pricingRules'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/auth', require('./routes/auth'));

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local server running on http://localhost:${PORT}`);
});
