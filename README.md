# SGData SDK

Modern TypeScript SDK for Singapore Government Open Data APIs. Access real-time transport, weather, and environmental data with full type safety.

> 🇸🇬 **Replaces the abandoned 8-year-old `data-dot-gov` package** with a modern, TypeScript-first approach.

## Features

- **TypeScript-first** — Full type definitions and IntelliSense support
- **Zero runtime dependencies** — Lightweight and secure
- **Automatic retry** — Exponential backoff on 429 and 5xx responses
- **Typed errors** — `SGDataError` and `SGDataRateLimitError` for precise error handling
- **Date/time filtering** — All endpoints accept an optional `date_time` parameter
- **Modern APIs** — Works with current data.gov.sg endpoints

## Installation

```bash
npm install sgdata-sdk
```

## Quick Start

```typescript
import { SGDataClient } from 'sgdata-sdk';

const client = new SGDataClient();

// Real-time carpark availability
const carparks = await client.getCarparkAvailability();
console.log(carparks.items[0].carpark_data);

// 2-hour weather forecast
const weather = await client.getWeatherForecast2H();
console.log(weather.items[0].forecasts);

// Air quality (PSI)
const psi = await client.getPSI();
console.log(psi.items[0].readings.psi_twenty_four_hourly);
```

## Configuration

```typescript
const client = new SGDataClient({
  apiKey: 'your-api-key',  // optional — for higher rate limits
  retries: 3,              // default: 3 (set to 0 to disable)
  retryDelay: 1000,        // base delay in ms, doubles each retry (default: 1000)
});
```

To get an API key: sign up at [data.gov.sg](https://data.gov.sg) and find it in your account dashboard.

## API Reference

All methods return typed promises. All methods accept an optional `{ date_time?: string }` parameter (ISO 8601) to query historical data — omit it to get the latest reading.

```typescript
await client.getTemperature();
await client.getTemperature({ date_time: '2025-01-15T10:00:00' });
```

### Transport

| Method | Description | Update frequency |
|---|---|---|
| `getCarparkAvailability()` | HDB/LTA/URA carpark lots | Every minute |
| `getTaxiAvailability()` | GPS coordinates of available taxis | Every 30 seconds |
| `getTrafficImages()` | Traffic camera images with metadata | Every 20 seconds |

### Weather

| Method | Description | Update frequency |
|---|---|---|
| `getWeatherForecast2H()` | Area-level 2-hour forecast | Every 30 minutes |
| `getWeatherForecast24H()` | General 24-hour forecast with temperature/wind/humidity | Multiple times daily |
| `getWeatherForecast4D()` | 4-day outlook | Twice daily |
| `getUVIndex()` | UV index readings | Hourly, 7AM–7PM |

### Environment

| Method | Description | Update frequency |
|---|---|---|
| `getPSI()` | Pollutant Standards Index by region | Every 15 minutes |
| `getTemperature()` | Air temperature across weather stations | Every 5 minutes |
| `getRainfall()` | Rainfall readings across weather stations | Every 5 minutes |
| `getHumidity()` | Relative humidity across weather stations | Every minute |

## Error Handling

```typescript
import { SGDataClient, SGDataError, SGDataRateLimitError } from 'sgdata-sdk';

const client = new SGDataClient();

try {
  const data = await client.getPSI();
} catch (error) {
  if (error instanceof SGDataRateLimitError) {
    console.log('Rate limited. Retry after:', error.retryAfter, 'seconds');
  } else if (error instanceof SGDataError) {
    console.log('API error:', error.statusCode, error.message);
  }
}
```

The SDK automatically retries `429` and `5xx` responses with exponential backoff before throwing. Set `retries: 0` to disable.

## Examples

### Find carparks with availability

```typescript
const carparks = await client.getCarparkAvailability();
const available = carparks.items[0].carpark_data
  .filter(cp => parseInt(cp.lots_available) > 10);
console.log(`${available.length} carparks with 10+ spaces`);
```

### Check if you need an umbrella

```typescript
const weather = await client.getWeatherForecast2H();
const rainy = weather.items[0].forecasts.some(f =>
  f.forecast.toLowerCase().includes('rain')
);
console.log(rainy ? 'Bring an umbrella' : 'No rain expected');
```

### Air quality alert

```typescript
const psi = await client.getPSI();
const national = psi.items[0].readings.psi_twenty_four_hourly.national;
if (national > 100) console.log('Unhealthy air quality today');
```

### Find available taxis nearby

```typescript
const taxis = await client.getTaxiAvailability();
console.log(`${taxis.features.length} taxis available`);
// Each feature has: geometry.coordinates = [longitude, latitude]
```

## TypeScript

All response types are exported:

```typescript
import {
  SGDataClient,
  // Transport
  CarparkInfo, CarparkAvailabilityResponse,
  TaxiAvailabilityResponse,
  TrafficCamera, TrafficImagesResponse,
  // Weather
  WeatherForecast2HResponse, WeatherForecast24HResponse, WeatherForecast4DResponse,
  UVIndexResponse,
  // Environment
  PSIResponse, TemperatureResponse, RainfallResponse, HumidityResponse,
  // Errors
  SGDataError, SGDataRateLimitError,
} from 'sgdata-sdk';
```

## Data Sources

All data is from Singapore's official [data.gov.sg](https://data.gov.sg) platform.

- **Transport**: Land Transport Authority (LTA), HDB, URA
- **Weather / Environment**: National Environment Agency (NEA)

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/KT-afk/sgdata-sdk).

## License

MIT — Ong Kong Tat
