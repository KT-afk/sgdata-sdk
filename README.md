# SGData SDK

Modern TypeScript SDK for Singapore Government Open Data APIs. Access real-time transport, weather, and environmental data with full type safety.

> 🇸🇬 **Replaces the abandoned 8-year-old `data-dot-gov` package** with a modern, TypeScript-first approach.

## Features

✅ **TypeScript-first** - Full type definitions and IntelliSense support  
✅ **Zero dependencies** - Lightweight and secure  
✅ **Modern APIs** - Works with current data.gov.sg endpoints (2025)  
✅ **No API key required** - Singapore's open data is truly open  
✅ **Well documented** - JSDoc comments and examples

## Installation
```bash
npm install sgdata-sdk
```

## Quick Start
```typescript
import { SGDataClient } from 'sgdata-sdk';

const client = new SGDataClient();

// Get real-time carpark availability
const carparks = await client.getCarparkAvailability();
console.log(carparks.items[0].carpark_data);

// Get 2-hour weather forecast
const weather = await client.getWeatherForecast2H();
console.log(weather.items[0].forecasts);

// Get air quality (PSI)
const psi = await client.getPSI();
console.log(psi.items[0].readings.psi_twenty_four_hourly);
```

## Using with API Key (Optional)

For higher rate limits, sign up at [data.gov.sg](https://data.gov.sg) to get an API key:
```typescript
import { SGDataClient } from 'sgdata-sdk';

// With API key for higher rate limits
const client = new SGDataClient({ 
  apiKey: 'your-api-key-here' 
});

// Without API key (default rate limits apply)
const client = new SGDataClient();
```

**Rate Limits:**
- Without API key: Standard rate limits apply
- With API key: 60 requests per minute per endpoint

To get an API key:
1. Go to https://data.gov.sg
2. Click "Sign up" in the top right
3. Follow the registration process
4. Your API key will be available in your account dashboard

## API Reference

### Transport

#### `getCarparkAvailability()`
Get real-time carpark availability across Singapore. Updated every minute.
```typescript
const data = await client.getCarparkAvailability();
// Returns: { items: [{ timestamp, carpark_data: [...] }] }
```

### Weather Forecasts

#### `getWeatherForecast2H()`
Get 2-hour weather forecast. Updated every 30 minutes.
```typescript
const forecast = await client.getWeatherForecast2H();
// Returns: { area_metadata, items: [{ forecasts: [...] }] }
```

#### `getWeatherForecast24H()`
Get 24-hour weather forecast. Updated multiple times daily.
```typescript
const forecast = await client.getWeatherForecast24H();
```

#### `getWeatherForecast4D()`
Get 4-day weather forecast. Updated twice daily.
```typescript
const forecast = await client.getWeatherForecast4D();
```

### Environment

#### `getPSI()`
Get current PSI (Pollutant Standards Index) readings. Updated every 15 minutes.
```typescript
const psi = await client.getPSI();
// Returns air quality readings for all regions
```

#### `getTemperature()`
Get real-time air temperature across Singapore. Updated every 5 minutes.
```typescript
const temp = await client.getTemperature();
```

#### `getRainfall()`
Get rainfall readings across Singapore. Updated every 5 minutes.
```typescript
const rainfall = await client.getRainfall();
```

#### `getHumidity()`
Get relative humidity readings. Updated every minute.
```typescript
const humidity = await client.getHumidity();
```

#### `getUVIndex()`
Get UV index readings. Updated hourly between 7AM and 7PM.
```typescript
const uv = await client.getUVIndex();
```

## Example Use Cases

### Find Available Parking Near You
```typescript
const carparks = await client.getCarparkAvailability();
const availableNow = carparks.items[0].carpark_data
  .filter(cp => parseInt(cp.lots_available) > 10)
  .slice(0, 5);
console.log('Carparks with 10+ spots:', availableNow);
```

### Check if You Need an Umbrella
```typescript
const weather = await client.getWeatherForecast2H();
const forecasts = weather.items[0].forecasts;
const rainy = forecasts.some(f => 
  f.forecast.toLowerCase().includes('rain')
);
console.log(rainy ? '🌧️ Bring umbrella!' : '☀️ No rain expected');
```

### Air Quality Alert
```typescript
const psi = await client.getPSI();
const national = psi.items[0].readings.psi_twenty_four_hourly.national;

if (national > 100) {
  console.log('⚠️ Unhealthy air quality');
} else {
  console.log('✅ Air quality is good');
}
```

## TypeScript Support

This SDK is written in TypeScript and includes full type definitions. You get autocomplete and type checking out of the box:
```typescript
import { SGDataClient, CarparkInfo, PSIReading } from 'sgdata-sdk';

const client = new SGDataClient();

// TypeScript knows the exact structure!
const carparks = await client.getCarparkAvailability();
const firstCarpark: CarparkInfo = carparks.items[0].carpark_data[0];
```

## Error Handling
```typescript
try {
  const data = await client.getCarparkAvailability();
  console.log(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
}
```

## Data Sources

All data is sourced from Singapore's official [data.gov.sg](https://data.gov.sg) platform.

- **Carpark Availability**: HDB, LTA, URA carparks
- **Weather**: National Environment Agency (NEA)
- **PSI**: National Environment Agency (NEA)


## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/KT-afk/sgdata-sdk).

## License

MIT

## Author

Ong Kong Tat - [GitHub](https://github.com/KT-afk)

---

Built for Singapore's developer community
