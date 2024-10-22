'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';

interface WeatherProps {
  city: string;
  averageTemp: number;
  feels_like: number;
  dominantCondition: string;
  icon: string;
  humidity: number; // Add humidity
  maxTemp: number; // Add max temperature
  minTemp: number; // Add min temperature
  date: string; // Add date
}

interface HeaderProps {
  dataChanged: boolean;
}

function Header({ dataChanged }: HeaderProps) {
  const [weatherData, setWeatherData] = useState<WeatherProps[]>([]);
  const [tempUnit, setTempUnit] = useState<'C' | 'K'>('C'); // Default to Celsius

  const { isAuthenticated, user } = useKindeBrowserClient();

  // Helper to map full unit names to shorthand forms (e.g., "Celsius" -> "C")
  const getShorthandUnit = (unit: 'Celsius' | 'Kelvin'): 'C' | 'K' =>
    unit === 'Celsius' ? 'C' : 'K';

  // Helper to convert Celsius to Kelvin if needed
  const formatTemperature = (temp: number) =>
    tempUnit === 'K' ? (temp + 273.15).toFixed(1) : temp.toFixed(1);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherRes = await fetch('/api/summaries');
        const weatherData = await weatherRes.json();
        setWeatherData(weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchSubscriptionData = async () => {
      try {
        const subscriptionRes = await fetch(
          `/api/subscribed?email=${user?.email}`
        );
        const subscriptionData = await subscriptionRes.json();
        console.log(subscriptionData);
        setTempUnit(
          getShorthandUnit(subscriptionData.subscription.temperatureUnit)
        );
      } catch (error) {
        console.error('Error fetching subscription data:', error);
      }
    };

    fetchWeatherData(); // Always fetch weather data

    if (isAuthenticated && user?.email) {
      fetchSubscriptionData(); // Fetch subscription only if user is authenticated
    }
  }, [isAuthenticated, user?.email, dataChanged]); // Re-run when authentication state or user email changes

  return (
    <div className="max-w-6xl mx-auto p-4 pt-7 w-full">
      <h1 className="text-2xl font-bold pb-3">Today&apos;s Weather Summary</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {weatherData.map((cityWeather) => (
          <Card
            key={cityWeather.city}
            className="w-full cursor-pointer hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {cityWeather.city}
              </CardTitle>
              <Image
                src={`https://openweathermap.org/img/wn/${cityWeather.icon}@2x.png`}
                alt="Weather Icon"
                width={60}
                height={60}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatTemperature(cityWeather.averageTemp)}°{tempUnit}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Feels like:</span>{' '}
                  {formatTemperature(cityWeather.feels_like)}°{tempUnit}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Condition:</span>{' '}
                  {cityWeather.dominantCondition}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Humidity:</span>{' '}
                  {cityWeather.humidity}%
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Max Temp:</span>{' '}
                  {formatTemperature(cityWeather.maxTemp)}°{tempUnit}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold">Min Temp:</span>{' '}
                  {formatTemperature(cityWeather.minTemp)}°{tempUnit}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Header;
