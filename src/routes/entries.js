const express = require('express');

const Entry = require('../models/Entry');
const { fetchWeatherForCity } = require('../services/openMeteo');

const router = express.Router();

router.get('/new', (req, res) => {
  res.render('pages/new-entry', {
    title: 'New Weather Note',
    error: null,
    values: { city: '', note: '' }
  });
});

router.post('/', async (req, res) => {
  const city = String(req.body.city || '').trim();
  const note = String(req.body.note || '').trim();

  if (!city || !note) {
    return res.status(400).render('pages/new-entry', {
      title: 'New Weather Note',
      error: 'City and note are required.',
      values: { city, note }
    });
  }

  try {
    const weather = await fetchWeatherForCity(city);
    await Entry.create({ city, note, weather });
    res.redirect('/entries');
  } catch (err) {
    res.status(err.status || 500).render('pages/new-entry', {
      title: 'New Weather Note',
      error: err.message || 'Something went wrong.',
      values: { city, note }
    });
  }
});

router.get('/', async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: -1 }).limit(20).lean();
  res.render('pages/entries', { title: 'Recent Weather Notes', entries });
});

router.post('/:id/delete', async (req, res) => {
  await Entry.deleteOne({ _id: req.params.id });
  res.redirect('/entries');
});

module.exports = router;
