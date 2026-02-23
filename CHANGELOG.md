# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-02-23

### Added

- `getTaxiAvailability()` — real-time GPS coordinates of available taxis (updates every 30 seconds)
- `getTrafficImages()` — traffic camera images with location metadata (updates every 20 seconds)
- `SGDataError` class — typed error with `statusCode` and `endpoint` properties
- `SGDataRateLimitError` class — extends `SGDataError`, adds optional `retryAfter` (seconds) from the `Retry-After` response header
- Automatic retry with exponential backoff on `429`, `500`, `502`, `503`, `504` responses (default: 3 retries, 1 s base delay)
- Optional `{ date_time?: string }` parameter on all endpoints — pass an ISO 8601 string to query a specific point in time; omit for the latest reading
- Full TypeScript types for `getWeatherForecast24H()` and `getWeatherForecast4D()` responses (previously `any`)
- Vitest unit test suite (31 tests, zero network required)
- `files` field in `package.json` — published package now contains only `dist/`

### Changed

- Internal: monolithic `src/index.ts` split into `src/client.ts`, `src/errors.ts`, `src/types/`, and `src/endpoints/` — public API unchanged
- `SGDataClient` constructor now accepts `retries` and `retryDelay` options in addition to `apiKey`

### Fixed

- Published package previously included `src/`, test files, and config files due to missing `files` field

---

## [0.1.1] - 2025-01-01

### Fixed

- Minor internal fixes

---

## [0.1.0] - 2025-01-01

### Added

- Initial release
- `getCarparkAvailability()`
- `getWeatherForecast2H()`, `getWeatherForecast24H()`, `getWeatherForecast4D()`
- `getPSI()`, `getTemperature()`, `getRainfall()`, `getHumidity()`, `getUVIndex()`
