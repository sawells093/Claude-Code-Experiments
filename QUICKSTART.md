# Quick Start Guide

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Get API Keys

**Mapbox** (Free - No credit card):
- Visit: https://account.mapbox.com/
- Sign up and copy your access token

**OpenWeatherMap** (Free - No credit card):
- Visit: https://home.openweathermap.org/api_keys
- Sign up and copy your API key
- ⚠️ May take 2-4 hours to activate

### 3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1...
VITE_OPENWEATHER_API_KEY=abcd1234...
```

### 4. Run Application
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Usage

1. Type a city name in the search bar (e.g., "New York")
2. Select from autocomplete suggestions
3. View weather and local time on the right panel

## Common Issues

**Map not loading?**
- Check Mapbox token in `.env` file
- Verify token is valid at https://account.mapbox.com/

**Weather not loading?**
- OpenWeatherMap keys take 2-4 hours to activate
- Check API key at https://home.openweathermap.org/api_keys
- Free tier limit: 1,000 calls/day

**Search not working?**
- Verify Mapbox token has geocoding access
- Check internet connection

## File Structure
```
src/
├── components/        # React components
├── services/         # API integrations
└── types/           # TypeScript definitions
```

## Key Files
- [README.md](README.md) - Full documentation
- [.env.example](.env.example) - Environment template
- [src/components/MapWidget.tsx](src/components/MapWidget.tsx) - Main component

## Support
Check the full [README.md](README.md) for detailed documentation.
