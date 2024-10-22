const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  averageTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
  humidity: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
