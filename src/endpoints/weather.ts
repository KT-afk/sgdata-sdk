import type {
  WeatherForecast2HResponse,
  WeatherForecast24HResponse,
  WeatherForecast4DResponse,
  UVIndexResponse,
} from '../types/weather';
import type { DateTimeParam } from './transport';

type RequestFn = <T>(path: string, params?: Record<string, string>) => Promise<T>;

function toParams(p?: DateTimeParam): Record<string, string> | undefined {
  return p?.date_time ? { date_time: p.date_time } : undefined;
}

export function getWeatherForecast2H(
  request: RequestFn,
  params?: DateTimeParam
): Promise<WeatherForecast2HResponse> {
  return request('/environment/2-hour-weather-forecast', toParams(params));
}

export function getWeatherForecast24H(
  request: RequestFn,
  params?: DateTimeParam
): Promise<WeatherForecast24HResponse> {
  return request('/environment/24-hour-weather-forecast', toParams(params));
}

export function getWeatherForecast4D(
  request: RequestFn,
  params?: DateTimeParam
): Promise<WeatherForecast4DResponse> {
  return request('/environment/4-day-weather-forecast', toParams(params));
}

export function getUVIndex(
  request: RequestFn,
  params?: DateTimeParam
): Promise<UVIndexResponse> {
  return request('/environment/uv-index', toParams(params));
}
