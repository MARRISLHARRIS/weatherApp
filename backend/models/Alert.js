// models/Alert.js
const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Alert = mongoose.model('Alert', AlertSchema);

module.exports = Alert;
