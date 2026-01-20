import axios from 'axios';
import type { WeatherData, WeatherApiResponse } from '../types';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherApiResponse>(
      `${BASE_URL}/weather`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: OPENWEATHER_API_KEY,
          units: 'metric', // Use Celsius
        },
      }
    );

    const data = response.data;

    return {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0]?.description || 'Unknown',
      icon: data.weather[0]?.icon || '01d',
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      timezone: data.timezone,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (error.response?.status === 404) {
        throw new Error('Location not found.');
      }
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
