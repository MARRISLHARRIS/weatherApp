const mongoose = require('mongoose');

const WeatherUpdateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  averageTemp: {
    type: Number,
    required: true,
  },
  maxTemp: {
    type: Number,
    required: true,
  },
  minTemp: {
    type: Number,
    required: true,
  },
  dominantCondition: {
    type: String,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  feels_like: {
    type: Number,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WeatherUpdate = mongoose.model('WeatherUpdate', WeatherUpdateSchema);

module.exports = WeatherUpdate;
