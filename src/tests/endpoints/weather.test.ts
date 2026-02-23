// src/tests/endpoints/weather.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getWeatherForecast2H,
  getWeatherForecast24H,
  getWeatherForecast4D,
  getUVIndex,
} from '../../endpoints/weather';

type RequestFn = <T>(path: string, params?: Record<string, string>) => Promise<T>;

describe('weather endpoints', () => {
  let mockRequest: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRequest = vi.fn().mockResolvedValue({});
  });

  it('getWeatherForecast2H calls correct path', async () => {
    await getWeatherForecast2H(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/environment/2-hour-weather-forecast', undefined);
  });

  it('getWeatherForecast24H calls correct path', async () => {
    await getWeatherForecast24H(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/environment/24-hour-weather-forecast', undefined);
  });

  it('getWeatherForecast4D calls correct path', async () => {
    await getWeatherForecast4D(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/environment/4-day-weather-forecast', undefined);
  });

  it('getWeatherForecast2H passes date_time when provided', async () => {
    await getWeatherForecast2H(mockRequest as RequestFn, { date_time: '2025-06-01T12:00:00' });
    expect(mockRequest).toHaveBeenCalledWith('/environment/2-hour-weather-forecast', {
      date_time: '2025-06-01T12:00:00',
    });
  });

  it('getUVIndex calls correct path', async () => {
    await getUVIndex(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/environment/uv-index', undefined);
  });
});
