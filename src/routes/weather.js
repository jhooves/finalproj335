const express = require('express');

const { fetchWeatherForCity } = require('../services/openMeteo');

const router = express.Router();

// JSON endpoint used by the app (also useful for demoing the API requirement)
// GET /weather?city=College%20Park
router.get('/', async (req, res) => {
  try {
    const city = req.query.city;
    const weather = await fetchWeatherForCity(city);
    res.json({ city: String(city || '').trim(), weather });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Server error' });
  }
});

module.exports = router;
