// models/UserSubscription.js
const mongoose = require('mongoose');

const UserSubscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  temperatureUnit: {
    type: String,
    enum: ['Kelvin', 'Celsius'],
    default: 'Celsius',
  },
  alertThreshold: { type: Number, default: 35 }, // e.g., temperature alert threshold
});

module.exports = mongoose.model('UserSubscription', UserSubscriptionSchema);
