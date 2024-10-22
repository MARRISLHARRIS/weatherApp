const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const fetchCoordinates = async (city) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  if (response.data.length === 0) {
    throw new Error('City not found');
  }
  return response.data[0];
};

const fetchWeather = async (city) => {
  const coordinates = await fetchCoordinates(city);
  const lat = coordinates.lat;
  const lon = coordinates.lon;

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  const weatherData = response.data;

  // Convert Kelvin to Celsius
  const tempC = weatherData.main.temp - 273.15;
  const maxTempC = weatherData.main.temp_max - 273.15;
  const minTempC = weatherData.main.temp_min - 273.15;
  const feelsLikeC = weatherData.main.feels_like - 273.15;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;

  return {
    date: new Date(weatherData.dt * 1000),
    averageTemp: tempC,
    maxTemp: maxTempC,
    minTemp: minTempC,
    dominantCondition: weatherData.weather[0].main,
    humidity: humidity,
    feels_like: feelsLikeC,
    windSpeed: windSpeed,
  };
};

module.exports = { fetchWeather };
