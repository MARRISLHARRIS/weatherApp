const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  date: { type: String, required: true },
  city: { type: String, required: true }, // New field for storing city name
  averageTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantCondition: String,
  humidity: Number,
  feels_like: Number,
  windSpeed: Number,
  icon: String,
  updateCount: { type: Number, default: 1 },
});

const WeatherSummary = mongoose.model('WeatherSummary', WeatherSummarySchema);

module.exports = WeatherSummary;
