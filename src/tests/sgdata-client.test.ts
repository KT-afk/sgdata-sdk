// src/tests/sgdata-client.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SGDataClient } from '../index';

describe('SGDataClient public API', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    }));
  });

  it('exposes getCarparkAvailability', async () => {
    const client = new SGDataClient();
    const result = await client.getCarparkAvailability();
    expect(result).toEqual({ items: [] });
  });

  it('exposes getTaxiAvailability', async () => {
    const client = new SGDataClient();
    const result = await client.getTaxiAvailability();
    expect(result).toEqual({ items: [] });
  });

  it('exposes getTrafficImages', async () => {
    const client = new SGDataClient();
    const result = await client.getTrafficImages();
    expect(result).toEqual({ items: [] });
  });

  it('exposes getWeatherForecast2H with optional date_time', async () => {
    const client = new SGDataClient();
    await client.getWeatherForecast2H({ date_time: '2025-01-01T08:00:00' });
    const mockFetch = vi.mocked(fetch);
    expect(mockFetch.mock.calls[0][0]).toContain('date_time=');
  });

  it('exposes getWeatherForecast24H (no longer any)', async () => {
    const client = new SGDataClient();
    const result = await client.getWeatherForecast24H();
    expect(result).toBeDefined();
  });

  it('exposes getWeatherForecast4D (no longer any)', async () => {
    const client = new SGDataClient();
    const result = await client.getWeatherForecast4D();
    expect(result).toBeDefined();
  });

  it('exposes getPSI, getTemperature, getRainfall, getHumidity, getUVIndex', async () => {
    const client = new SGDataClient();
    await expect(client.getPSI()).resolves.toBeDefined();
    await expect(client.getTemperature()).resolves.toBeDefined();
    await expect(client.getRainfall()).resolves.toBeDefined();
    await expect(client.getHumidity()).resolves.toBeDefined();
    await expect(client.getUVIndex()).resolves.toBeDefined();
  });
});
