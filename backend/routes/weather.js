const express = require('express');
const WeatherSummary = require('../models/WeatherSummary');
const WeatherUpdate = require('../models/WeatherUpdate');
const router = express.Router();

router.get('/weathersummaries', async (req, res) => {
  try {
    const summaries = await WeatherSummary.find({});
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/updates', async (req, res) => {
  try {
    const updates = await WeatherUpdate.find({});
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
