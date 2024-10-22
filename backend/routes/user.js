const express = require('express');
const UserSubscription = require('../models/UserSubscription');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
  try {
    const { email, temperatureUnit, alertThreshold } = req.body;

    const subscription = new UserSubscription({
      email,
      temperatureUnit,
      alertThreshold,
    });

    await subscription.save();
    res.json({ message: 'Subscription successful', subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create a new route to know wheather user is subscribed or not
router.get('/check-subscription/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const subscription = await UserSubscription.findOne({ email: email });
    if (subscription) {
      res.json({ message: 'User is subscribed', subscription });
    } else {
      res.json({ message: 'User is not subscribed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// unsubscribe user
router.delete('/unsubscribe/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const subscription = await UserSubscription.findOneAndDelete({
      email: email,
    });
    if (subscription) {
      res.json({ message: 'User unsubscribed successfully' });
    } else {
      res.json({ message: 'User is not subscribed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
