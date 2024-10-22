'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale, // Import the TimeScale for the x-axis
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Include date-fns adapter for time handling

// Register chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale // Register the TimeScale
);

interface WeatherUpdate {
  createdAt: string; // Use createdAt for timestamps
  city: string;
  averageTemp: number; // Using averageTemp from your schema
}

function Temperature() {
  const [temperatureData, setTemperatureData] = useState<WeatherUpdate[]>([]);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await fetch('/api/updates'); // Adjust the API endpoint if necessary
        const data = await response.json();
        console.log('Data:', data);

        // Extracting the createdAt, city, and average temperature
        const tempData = data.map((item: any) => ({
          createdAt: new Date(item.createdAt).toISOString(), // Ensure the date is in ISO format
          city: item.city,
          averageTemp: item.averageTemp, // Using averageTemp
        }));

        setTemperatureData(tempData);
        console.log('Temperature Data:', tempData);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    fetchTemperatureData();
  }, []);

  // Get today's date for filtering
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of the day

  // Prepare chart data
  const cities = Array.from(new Set(temperatureData.map((item) => item.city))); // Unique cities

  // Filter for today's data
  const todayTemperatureData = temperatureData.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= today; // Only keep today's data
  });

  // Create datasets for each city
  const datasets = cities.map((city) => {
    return {
      label: city,
      data: todayTemperatureData
        .filter((item) => item.city === city)
        .map((item) => ({ x: item.createdAt, y: item.averageTemp })), // Format for time
      fill: false,
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color for area
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`, // Random color for each line
      borderWidth: 2,
      pointRadius: 5,
    };
  });

  // Prepare chart data
  const chartData = {
    datasets: datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw.y} °C`, // Access average temperature through y
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false, // Set to false to allow negative temperatures if necessary
        title: {
          display: true,
          text: 'Average Temperature (°C)', // Update the label for average temperature
        },
      },
      x: {
        type: 'time' as const, // Specify 'time' as the axis type
        time: {
          unit: 'minute', // Adjust the unit as needed
          tooltipFormat: 'yyyy-mm-dd HH:mm', // Format for tooltip
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
    } as const, // Add 'as const' to enforce type safety
  };

  return (
    <div className="max-w-6xl w-full p-6 mx-auto flex items-center gap-3 flex-col">
      <h2 className="text-center text-xl font-bold mb-4">
        Average Temperature Overview
      </h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default Temperature;
