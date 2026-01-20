import { useState, useCallback, useEffect, useRef } from 'react';
import Map from './Map';
import LocationSearch from './LocationSearch';
import WeatherDisplay from './WeatherDisplay';
import { getCurrentWeather } from '../services/weatherService';
import type { Location, WeatherData } from '../types';

// Microsoft HQ Redmond coordinates
const MICROSOFT_HQ: Location = {
  latitude: 47.6423,
  longitude: -122.1390,
  name: 'Microsoft Campus, Redmond, WA, USA'
};

export default function MapWidget() {
  const [location, setLocation] = useState<Location>(MICROSOFT_HQ);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const isTypingRef = useRef(false);

  const handleLocationSelect = useCallback(async (newLocation: Location) => {
    setLocation(newLocation);
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const weatherData = await getCurrentWeather(
        newLocation.latitude,
        newLocation.longitude
      );
      setWeather(weatherData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load default location on mount
  useEffect(() => {
    handleLocationSelect(MICROSOFT_HQ);
  }, [handleLocationSelect]);

  // 3D tilt effect on mouse move
  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const shineOverlay = widget.querySelector('.shine-overlay') as HTMLElement;
    if (!shineOverlay) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Don't apply tilt effect if user is interacting with the map or typing
      if (isInteractingRef.current || isTypingRef.current) return;

      const rect = widget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      widget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update shine position based on mouse position
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      shineOverlay.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 50%)`;
      shineOverlay.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      widget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      shineOverlay.style.opacity = '0';
    };

    const handleMouseDown = () => {
      isInteractingRef.current = true;
      // Reset to neutral position when interaction starts
      widget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      shineOverlay.style.opacity = '0';
    };

    const handleMouseUp = () => {
      isInteractingRef.current = false;
    };

    // Handle typing in search input
    const searchInput = widget.querySelector('.mapboxgl-ctrl-geocoder--input') as HTMLInputElement;
    const handleFocus = () => {
      isTypingRef.current = true;
      widget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      shineOverlay.style.opacity = '0';
    };

    const handleBlur = () => {
      isTypingRef.current = false;
    };

    widget.addEventListener('mousemove', handleMouseMove);
    widget.addEventListener('mouseleave', handleMouseLeave);
    widget.addEventListener('mousedown', handleMouseDown);
    widget.addEventListener('mouseup', handleMouseUp);

    if (searchInput) {
      searchInput.addEventListener('focus', handleFocus);
      searchInput.addEventListener('blur', handleBlur);
    }

    return () => {
      widget.removeEventListener('mousemove', handleMouseMove);
      widget.removeEventListener('mouseleave', handleMouseLeave);
      widget.removeEventListener('mousedown', handleMouseDown);
      widget.removeEventListener('mouseup', handleMouseUp);

      if (searchInput) {
        searchInput.removeEventListener('focus', handleFocus);
        searchInput.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  return (
    <div ref={widgetRef} className="map-widget">
      <div className="shine-overlay"></div>
      <div className="content-container">
        <div className="map-container">
          <Map location={location} />

          {/* Weather display overlay - top right */}
          <div className="weather-container">
            <WeatherDisplay
              locationName={location.name}
              weather={weather}
              loading={loading}
              error={error}
            />
          </div>

          {/* Search bar at bottom */}
          <div className="search-container">
            <LocationSearch onLocationSelect={handleLocationSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
