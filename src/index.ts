/**
 * SGData SDK - Modern TypeScript SDK for Singapore Government Open Data APIs
 * @see https://data.gov.sg
 */

export { SGDataError, SGDataRateLimitError } from './errors';
export type { SGDataClientConfig } from './client';
export type {
  CarparkInfo,
  CarparkAvailabilityResponse,
  TaxiAvailabilityResponse,
  TrafficCamera,
  TrafficImagesResponse,
} from './types/transport';
export type {
  WeatherArea,
  WeatherForecast,
  WeatherForecast2HResponse,
  WeatherForecast24HResponse,
  WeatherForecast4DResponse,
  UVIndexReading,
  UVIndexResponse,
} from './types/weather';
export type {
  RegionReading,
  PSIResponse,
  WeatherStation,
  TemperatureReading,
  TemperatureResponse,
  RainfallReading,
  RainfallResponse,
  HumidityReading,
  HumidityResponse,
} from './types/environment';

import { BaseClient, SGDataClientConfig } from './client';
import { DateTimeParam } from './endpoints/transport';
import {
  getCarparkAvailability,
  getTaxiAvailability,
  getTrafficImages,
} from './endpoints/transport';
import {
  getWeatherForecast2H,
  getWeatherForecast24H,
  getWeatherForecast4D,
  getUVIndex,
} from './endpoints/weather';
import { getPSI, getTemperature, getRainfall, getHumidity } from './endpoints/environment';
import type {
  CarparkAvailabilityResponse,
  TaxiAvailabilityResponse,
  TrafficImagesResponse,
} from './types/transport';
import type {
  WeatherForecast2HResponse,
  WeatherForecast24HResponse,
  WeatherForecast4DResponse,
  UVIndexResponse,
} from './types/weather';
import type {
  PSIResponse,
  TemperatureResponse,
  RainfallResponse,
  HumidityResponse,
} from './types/environment';

export class SGDataClient extends BaseClient {
  constructor(config?: SGDataClientConfig) {
    super(config);
  }

  // Transport
  getCarparkAvailability(params?: DateTimeParam): Promise<CarparkAvailabilityResponse> {
    return getCarparkAvailability((p, q) => this.request(p, q), params);
  }

  getTaxiAvailability(params?: DateTimeParam): Promise<TaxiAvailabilityResponse> {
    return getTaxiAvailability((p, q) => this.request(p, q), params);
  }

  getTrafficImages(params?: DateTimeParam): Promise<TrafficImagesResponse> {
    return getTrafficImages((p, q) => this.request(p, q), params);
  }

  // Weather
  getWeatherForecast2H(params?: DateTimeParam): Promise<WeatherForecast2HResponse> {
    return getWeatherForecast2H((p, q) => this.request(p, q), params);
  }

  getWeatherForecast24H(params?: DateTimeParam): Promise<WeatherForecast24HResponse> {
    return getWeatherForecast24H((p, q) => this.request(p, q), params);
  }

  getWeatherForecast4D(params?: DateTimeParam): Promise<WeatherForecast4DResponse> {
    return getWeatherForecast4D((p, q) => this.request(p, q), params);
  }

  getUVIndex(params?: DateTimeParam): Promise<UVIndexResponse> {
    return getUVIndex((p, q) => this.request(p, q), params);
  }

  // Environment
  getPSI(params?: DateTimeParam): Promise<PSIResponse> {
    return getPSI((p, q) => this.request(p, q), params);
  }

  getTemperature(params?: DateTimeParam): Promise<TemperatureResponse> {
    return getTemperature((p, q) => this.request(p, q), params);
  }

  getRainfall(params?: DateTimeParam): Promise<RainfallResponse> {
    return getRainfall((p, q) => this.request(p, q), params);
  }

  getHumidity(params?: DateTimeParam): Promise<HumidityResponse> {
    return getHumidity((p, q) => this.request(p, q), params);
  }
}
