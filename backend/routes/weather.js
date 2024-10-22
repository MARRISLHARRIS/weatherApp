const express = require('express');
const { fetchWeather } = require('../services/weatherService');
const WeatherSummary = require('../models/WeatherSummary');
const UserSubscription = require('../models/UserSubscription');
const router = express.Router();

router.get('/city/:city', async (req, res) => {
  try {
    const weatherData = await fetchWeather(req.params.city);

    const summary = new WeatherSummary({
      date: weatherData.date,
      averageTemp: weatherData.averageTemp,
      maxTemp: weatherData.maxTemp,
      minTemp: weatherData.minTemp,
      dominantCondition: weatherData.dominantCondition,
      humidity: weatherData.humidity,
      feels_like: weatherData.feels_like,
      windSpeed: weatherData.windSpeed,
    });
    await summary.save();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/weathersummaries', async (req, res) => {
  try {
    const summaries = await WeatherSummary.find({});
    console.log(summaries);
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
