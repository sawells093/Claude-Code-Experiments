export interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  timezone: number; // Offset in seconds from UTC
}

export interface WeatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  timezone: number;
  name: string;
}

export interface GeocoderResult {
  center: [number, number]; // [longitude, latitude]
  place_name: string;
  text: string;
}
