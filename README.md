# Real-Time Weather Monitoring System

This project implements a real-time weather monitoring system that retrieves data from the [OpenWeatherMap API](https://openweathermap.org/) to track and summarize weather conditions for major Indian cities. The system processes this data to provide real-time insights, including daily weather summaries, temperature rollups, and alert notifications when weather thresholds are exceeded. To optimize performance, the project leverages **React Server Components** for faster data fetching and improved UI responsiveness.

![Weather Monitoring System](./images/banner.png)

## Table of Contents

- [Real-Time Weather Monitoring System](#real-time-weather-monitoring-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Fetching Weather Data](#fetching-weather-data)
    - [User Subscription](#user-subscription)
    - [Email Alerts](#email-alerts)
  - [Routes](#routes)
    - [User Routes](#user-routes)
    - [Weather Routes](#weather-routes)
  - [Alerts](#alerts)
  - [Tests](#tests)
  - [Bonus Features](#bonus-features)
  - [Contact](#contact)

## Features

- **Real-time Weather Monitoring**: The system continuously retrieves weather data for major Indian cities (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad) at configurable intervals (default: 5 minutes).
- **Daily Weather Summaries**: It computes daily weather aggregates such as average, maximum, and minimum temperatures, and identifies the dominant weather condition (e.g., Rain, Clear, Snow).
- **User Subscription**: Users can subscribe to custom weather alerts and set thresholds for temperature monitoring.
- **Alerts System**: The system sends email notifications to users when predefined weather conditions are exceeded.
- **Visualizations**: Future updates will introduce dashboards for visualizing weather trends.
- **React Server Components**: Utilized React Server Components to speed up data fetching and improve UI rendering by processing the most intensive server-side tasks.

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - MongoDB (via Mongoose)
  - OpenWeatherMap API
  - Node-cron for scheduled tasks
  - Nodemailer for email alerts
- **Frontend**:
  - Next.js (with React Server Components for improved performance)
  - Kinde for authentication
  - TailwindCSS for styling
- **Other Tools**:
  - Docker & Docker Compose (for containerization)
  - Environment variable management via `.env` files

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- OpenWeatherMap API Key (sign up [here](https://home.openweathermap.org/users/sign_up))
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thekavikumar/weatherapp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weatherapp
   ```

3. Install backend and frontend dependencies:

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
     EMAIL_PASS=your_app_password
     WEATHER_API_KEY=your_openweathermap_api_key
     MONGODB_URI=mongodb://admin:password@localhost:27017/weather_app?authSource=admin
     ```

   - Frontend `.env.local`:

     ```bash
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

5. (Optional) If using Docker, create and run the containers:

   ```bash
   docker-compose up --build
   ```

6. Start the backend server (if not using Docker):

   ```bash
   cd backend
   npm start
   ```

7. Start the frontend app:

   ```bash
   cd frontend
   npm run dev
   ```

8. Access the frontend at [http://localhost:3000](http://localhost:3000).

## Usage

### Fetching Weather Data

The system fetches weather data for the configured cities every 5 minutes using cron jobs. You can adjust the interval in the `cron.schedule` expression in the `server.js` file.

### User Subscription

Users can subscribe to receive weather alerts via the provided API routes (see below) and set custom thresholds for temperature alerts.

### Email Alerts

When weather conditions exceed user-defined thresholds, the system sends an email alert using Nodemailer.

## Routes

### User Routes

| Route                                  | Method | Description                           |
| -------------------------------------- | ------ | ------------------------------------- |
| `/api/user/subscribe`                  | POST   | Subscribe to weather alerts           |
| `/api/user/update-subscription/:email` | PUT    | Update a user's subscription settings |
| `/api/user/check-subscription/:email`  | GET    | Check if a user is subscribed         |
| `/api/user/unsubscribe/:email`         | DELETE | Unsubscribe from weather alerts       |
| `/api/user/alerts/:email`              | GET    | Retrieve all alerts sent to a user    |

### Weather Routes

| Route                           | Method | Description                     |
| ------------------------------- | ------ | ------------------------------- |
| `/api/weather/weathersummaries` | GET    | Get all daily weather summaries |
| `/api/weather/updates`          | GET    | Get all recent weather updates  |

## Alerts

- **Alerting Thresholds**: Users can set custom thresholds for temperature (e.g., receive an alert if the temperature exceeds 35°C for two consecutive updates).
- **Email Notifications**: Alerts are sent to users via Gmail's SMTP service.

## Tests

The system includes test cases to verify key functionalities:

1. **System Setup**: Ensures the server starts and connects to OpenWeatherMap API.
2. **Data Retrieval**: Tests that API calls to OpenWeatherMap are made at scheduled intervals and the data is parsed correctly.
3. **Temperature Conversion**: Confirms correct conversion of temperature from Kelvin to Celsius (or Fahrenheit, if extended).
4. **Daily Weather Summaries**: Verifies that daily summaries (average, max, min) are computed accurately.
5. **Alerting Mechanism**: Simulates weather conditions to ensure alerts are triggered when thresholds are breached.

## Bonus Features

1. **User Authentication**: Integrated user authentication using Kinde.
2. **Email Alerts**: Configured email alerts using Nodemailer.
3. **Dockerized Setup**: Enabled containerization with Docker.
4. **Extended Metrics**: Added support for humidity, wind speed, and other weather metrics.
5. **React Server Components**: Used React Server Components for faster server-side data handling and performance optimization.

## Contact

- 📩 Email: kavikumar.hackathons@gmail.com
- 🌐 LinkedIn: [Kavikumar M](https://www.linkedin.com/in/thekavikumar/)
- 🚀 Portfolio: [kavikumar.vercel.app](https://kavikumar.vercel.app/)
