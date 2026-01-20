# Map Widget

A React + TypeScript map widget that allows users to search for locations and displays the current time and temperature for the selected location.

## Features

- **Interactive Map**: Powered by Mapbox GL JS with smooth animations and navigation controls
- **Location Search**: Autocomplete search functionality using Mapbox Geocoding API
- **Weather Information**: Real-time weather data including temperature, humidity, and wind speed
- **Local Time Display**: Shows the current time for the selected location with automatic updates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type-Safe**: Built with TypeScript for enhanced developer experience

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Mapbox GL JS** - Interactive maps
- **Mapbox Geocoding API** - Location search with autocomplete
- **OpenWeatherMap API** - Weather data
- **Axios** - HTTP client for API requests
- **date-fns** - Date and time formatting

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

You'll also need API keys from:
1. **Mapbox**: Sign up at [https://www.mapbox.com/](https://www.mapbox.com/)
2. **OpenWeatherMap**: Sign up at [https://openweathermap.org/api](https://openweathermap.org/api)

### API Key Information

**Mapbox (Free Tier)**:
- 50,000 map loads per month
- Includes Geocoding API
- No credit card required

**OpenWeatherMap (Free Tier)**:
- 1,000 API calls per day
- Current weather data
- No credit card required

## Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd "Map Widget"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```

   - Open the `.env` file and add your API keys:
     ```env
     VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
     VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
     ```

## Getting API Keys

### Mapbox Access Token

1. Go to [https://www.mapbox.com/](https://www.mapbox.com/)
2. Click "Sign up" and create a free account
3. Once logged in, go to your [Account page](https://account.mapbox.com/)
4. Scroll down to "Access tokens"
5. Copy your "Default public token" or create a new one
6. Paste it into your `.env` file as `VITE_MAPBOX_ACCESS_TOKEN`

### OpenWeatherMap API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After verifying your email, log in
4. Go to "API keys" section in your account
5. Copy the default API key (or create a new one)
6. Paste it into your `.env` file as `VITE_OPENWEATHER_API_KEY`
7. **Note**: It may take a few hours for your API key to be activated

## Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

3. **Search for a location**:
   - Click on the search bar at the top
   - Type a city name (e.g., "New York", "London", "Tokyo")
   - Select a location from the autocomplete suggestions
   - The map will center on the location and display weather information

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
Map Widget/
├── src/
│   ├── components/
│   │   ├── Map.tsx              # Map display component
│   │   ├── LocationSearch.tsx   # Search input with autocomplete
│   │   ├── WeatherDisplay.tsx   # Weather and time information
│   │   └── MapWidget.tsx        # Main container component
│   ├── services/
│   │   ├── weatherService.ts    # OpenWeatherMap API integration
│   │   └── timezoneService.ts   # Time calculations
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # React entry point
│   ├── App.css                  # Application styles
│   └── index.css                # Global styles
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── .env.example                 # Environment variables template
└── README.md                    # This file
```

## Usage

1. **Search for a Location**:
   - Type in the search bar
   - Select from autocomplete suggestions
   - Or enter a full address/place name and press Enter

2. **View Information**:
   - The map will center on your selected location
   - A marker will appear at the exact coordinates
   - The right panel shows:
     - Location name
     - Current local date and time (updates every second)
     - Current temperature and weather conditions
     - Additional details (feels like, humidity, wind speed)

3. **Navigate the Map**:
   - Click and drag to pan
   - Use mouse wheel or +/- buttons to zoom
   - Use the navigation controls in the top-right corner

## Troubleshooting

### Map doesn't load
- Check that your Mapbox access token is correctly set in `.env`
- Ensure the token is valid and not expired
- Check browser console for error messages

### Weather data doesn't load
- Verify your OpenWeatherMap API key is correctly set in `.env`
- New API keys may take a few hours to activate
- Check if you've exceeded the free tier limit (1,000 calls/day)
- Check browser console for error messages

### Search doesn't work
- Ensure your Mapbox access token has Geocoding API access
- Check your internet connection
- Verify the token in `.env` is correct

### Time is incorrect
- The time is calculated using the timezone offset from OpenWeatherMap
- Ensure your system clock is correct
- The time should update every second

## API Rate Limits

**Mapbox Free Tier**:
- 50,000 map loads per month
- Unlimited geocoding requests (within rate limits)

**OpenWeatherMap Free Tier**:
- 1,000 API calls per day
- 60 calls per minute

To avoid hitting rate limits, the app only fetches weather data when a new location is selected.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!

## Acknowledgments

- [Mapbox](https://www.mapbox.com/) for mapping services
- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Vite](https://vitejs.dev/) for the build tool
- [React](https://react.dev/) for the UI framework
