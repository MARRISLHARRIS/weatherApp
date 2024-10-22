# Real-Time Weather Monitoring System

This project is a real-time weather monitoring system that retrieves data from the [OpenWeatherMap API](https://openweathermap.org/) to track and summarize weather conditions for major Indian cities. It processes this data to provide real-time insights, including daily weather summaries, temperature rollups, and alerting functionality when certain weather thresholds are exceeded.

## Table of Contents

- [Real-Time Weather Monitoring System](#real-time-weather-monitoring-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [1. Fetching Weather Data](#1-fetching-weather-data)
    - [2. User Subscription](#2-user-subscription)
    - [3. Email Alerts](#3-email-alerts)
  - [Routes](#routes)
    - [**User Routes**](#user-routes)
    - [**Weather Routes**](#weather-routes)
  - [Alerts](#alerts)
  - [Tests](#tests)

## Features

- **Real-time Weather Monitoring**: Continuously fetches weather data for major Indian cities (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad) at configurable intervals (default: 5 minutes).
- **Daily Weather Summaries**: Calculates daily aggregates, such as:
  - Average, maximum, and minimum temperatures
  - Dominant weather condition (e.g., Rain, Clear, Snow)
- **User Subscription**: Allows users to subscribe to weather alerts and set custom thresholds for temperature.
- **Alerts System**: Sends email alerts to users when weather conditions breach defined thresholds
- **Visualizations**: (Optional) Future updates may include dashboards for visualizing weather trends.

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - MongoDB (via Mongoose)
  - OpenWeatherMap API
  - Node-cron for scheduled tasks
  - Nodemailer for email alerts
- **Frontend**:
  - Next.js
  - Kinde (Authentication)
  - TailwindCSS (Styling)
- **Other Tools**:
  - Docker & Docker Compose (for containerization)
  - Environment variable management via `.env` files

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- OpenWeatherMap API Key (can be obtained [here](https://home.openweathermap.org/users/sign_up))
- [Docker](https://www.docker.com/) (if you wish to run the app in containers)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-monitoring-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-monitoring-system
   ```

3. Install the backend and frontend dependencies:

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. Set up the `.env` files in both `backend/` and `frontend/` directories with the necessary environment variables:

   - Backend `.env`:

     ```bash
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_email_password
     WEATHER_API_KEY=your_openweathermap_api_key
     MONGO_URI=mongodb://localhost:27017/weatherdb
     ```

   - Frontend `.env.local`:
     ```bash
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

5. If you're using Docker, create and run the containers:

   ```bash
   docker-compose up --build
   ```

6. To start the backend server (if not using Docker):

   ```bash
   cd backend
   npm start
   ```

7. To start the frontend app:

   ```bash
   cd frontend
   npm run dev
   ```

8. Access the frontend at [http://localhost:3000](http://localhost:3000).

## Usage

### 1. Fetching Weather Data

The system automatically fetches weather data for the specified cities at 5-minute intervals using cron jobs. You can modify the interval in the `cron.schedule` expression inside the `server.js` file.

### 2. User Subscription

Users can subscribe for weather alerts via API routes (see below). They can set custom thresholds for temperature alerts.

### 3. Email Alerts

If the weather exceeds the user-defined thresholds, the system sends an email alert using Nodemailer.

## Routes

### **User Routes**

| Route                                  | Method | Description                           |
| -------------------------------------- | ------ | ------------------------------------- |
| `/api/user/subscribe`                  | POST   | Subscribe to weather alerts           |
| `/api/user/update-subscription/:email` | PUT    | Update a user's subscription settings |
| `/api/user/check-subscription/:email`  | GET    | Check if a user is subscribed         |
| `/api/user/unsubscribe/:email`         | DELETE | Unsubscribe from weather alerts       |
| `/api/user/alerts/:email`              | GET    | Retrieve all alerts sent to a user    |

### **Weather Routes**

| Route                           | Method | Description                     |
| ------------------------------- | ------ | ------------------------------- |
| `/api/weather/weathersummaries` | GET    | Get all daily weather summaries |
| `/api/weather/updates`          | GET    | Get all weather updates         |

## Alerts

- **Alerting Thresholds**: Users can set custom temperature thresholds (e.g., get an alert if the temperature exceeds 35°C for two consecutive updates).
- **Email Notifications**: Alerts are sent via email using Gmail's SMTP service.

## Tests

The system has a few key test cases to verify functionality:

1. **System Setup**: Verifies if the server starts and connects to the OpenWeatherMap API.
2. **Data Retrieval**: Tests if API calls to OpenWeatherMap are made at specified intervals and data is parsed correctly.
3. **Temperature Conversion**: Ensures the temperature values are correctly converted from Kelvin to Celsius (or Fahrenheit if extended).
4. **Daily Weather Summaries**: Checks that daily summaries (average, max, min) are calculated accurately.
5. **Alerting Mechanism**: Simulates weather conditions that breach user-defined thresholds to ensure alerts are sent correctly.
