// models/WeatherSummary.js
const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  averageTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
  humidity: { type: Number, required: true }, // New field
  feels_like: { type: Number, required: true }, // New field
  windSpeed: { type: Number, required: true }, // New field
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
