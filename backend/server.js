const express = require('express');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weather');
const userRoutes = require('./routes/user');
const cron = require('node-cron');
const { fetchWeather } = require('./services/weatherService');
const WeatherSummary = require('./models/WeatherSummary');
const UserSubscription = require('./models/UserSubscription');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/weather', weatherRoutes);
app.use('/api/user', userRoutes);

// Email sending function
const sendAlertEmail = async (email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Weather Alert',
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

// Cron Job for daily rollups and alerting
cron.schedule('*/30 * * * *', async () => {
  const cities = [
    'Delhi',
    'Mumbai',
    'Chennai',
    'Bangalore',
    'Kolkata',
    'Hyderabad',
  ];

  for (const city of cities) {
    try {
      const weatherData = await fetchWeather(city);

      // Create a new weather summary
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
      console.log(`Weather summary for ${city} saved!`);

      // Alerting logic
      const users = await UserSubscription.find({});
      for (const user of users) {
        if (
          user.alertThreshold &&
          weatherData.averageTemp > user.alertThreshold
        ) {
          const message = `Alert: Temperature in ${city} exceeds ${user.alertThreshold} degrees Celsius!`;
          await sendAlertEmail(user.email, message);
        }
      }
    } catch (error) {
      console.error(`Error fetching weather for ${city}:`, error);
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
