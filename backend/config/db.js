// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      // 'mongodb://localhost:27017/weather_app',
      'mongodb://admin:password@mongodb:27017/weather_app?authSource=admin',
      // 'mongodb://admin:password@localhost:27017/weather_app?authSource=admin',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
