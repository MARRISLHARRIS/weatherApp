const express = require('express');
const { fetchWeather } = require('../services/weatherService');
const WeatherSummary = require('../models/WeatherSummary');
const router = express.Router();

router.get('/:city', async (req, res) => {
  try {
    const weatherData = await fetchWeather(req.params.city);

    // Aggregate weather data (here we use the current data for simplicity)
    const summary = new WeatherSummary({
      date: new Date(),
      averageTemp: weatherData.current.temp,
      maxTemp: weatherData.current.temp,
      minTemp: weatherData.current.temp,
      dominantCondition: weatherData.current.weather[0].main,
    });
    await summary.save();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
