import { useEffect, useState } from 'react';
import type { WeatherData } from '../types';
import { getLocalDateTime } from '../services/timezoneService';

// Map weather descriptions to emojis
const getWeatherEmoji = (description: string): string => {
  const desc = description.toLowerCase();

  if (desc.includes('clear')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️';
  if (desc.includes('thunder') || desc.includes('storm')) return '⛈️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return '🌫️';
  if (desc.includes('wind')) return '💨';

  return '🌤️'; // partly cloudy as default
};

interface WeatherDisplayProps {
  locationName: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export default function WeatherDisplay({
  weather,
  loading,
  error,
}: WeatherDisplayProps) {
  const [currentTime, setCurrentTime] = useState<{ date: string; time: string } | null>(null);

  // Update time every second
  useEffect(() => {
    if (!weather) {
      setCurrentTime(null);
      return;
    }

    const updateTime = () => {
      setCurrentTime(getLocalDateTime(weather.timezone));
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [weather]);

  if (loading) {
    return (
      <div className="weather-display loading">
        <div className="spinner"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-display error">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!weather || !currentTime) {
    return null; // Don't show anything when no location selected
  }

  const weatherEmoji = getWeatherEmoji(weather.description);

  return (
    <div className="weather-display-container">
      {/* Time display */}
      <div className="time-display">
        {currentTime.time}
      </div>

      {/* Temperature and weather */}
      <div className="weather-info-compact">
        <div className="temperature-compact">
          <span className="weather-emoji">{weatherEmoji}</span>
          <span className="temp-value-compact">{weather.temperature}°</span>
        </div>
        <div className="weather-description-compact">
          {weather.description}
        </div>
      </div>
    </div>
  );
}
