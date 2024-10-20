const express = require('express');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weather');
const cron = require('node-cron');
const { fetchWeather } = require('./services/weatherService'); // Import the modified fetchWeather function
const WeatherSummary = require('./models/WeatherSummary'); // Ensure you import your WeatherSummary model
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/weather', weatherRoutes);

// Schedule a task to run every 5 minutes
cron.schedule('*/1 * * * *', async () => {
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
      const weatherData = await fetchWeather(city); // Fetch weather data with coordinates
      // Create a new weather summary document
      const summary = new WeatherSummary({
        date: weatherData.date,
        averageTemp: weatherData.averageTemp,
        maxTemp: weatherData.maxTemp,
        minTemp: weatherData.minTemp,
        dominantCondition: weatherData.dominantCondition,
        humidity: weatherData.humidity, // Save humidity
        feels_like: weatherData.feels_like, // Save feels like
        windSpeed: weatherData.windSpeed, // Save wind speed
      });
      console.log(`Fetched weather for ${city}:`, summary);
      await summary.save();
    } catch (error) {
      console.error(`Error fetching weather for ${city}:`, error);
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
