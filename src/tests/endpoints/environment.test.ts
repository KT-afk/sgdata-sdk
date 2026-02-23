// src/tests/endpoints/environment.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getPSI,
  getTemperature,
  getRainfall,
  getHumidity,
} from '../../endpoints/environment';

type RequestFn = <T>(path: string, params?: Record<string, string>) => Promise<T>;

describe('environment endpoints', () => {
  let mockRequest: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRequest = vi.fn().mockResolvedValue({});
  });

  it('getPSI calls correct path', async () => {
    await getPSI(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/environment/psi', undefined);
  });

  it('getTemperature calls correct path', async () => {
    await getTemperature(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/environment/air-temperature', undefined);
  });

  it('getRainfall calls correct path', async () => {
    await getRainfall(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/environment/rainfall', undefined);
  });

  it('getHumidity calls correct path', async () => {
    await getHumidity(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/environment/relative-humidity', undefined);
  });

  it('getPSI passes date_time when provided', async () => {
    await getPSI(mockRequest as RequestFn, { date_time: '2025-01-15T08:00:00' });
    expect(mockRequest).toHaveBeenCalledWith('/environment/psi', {
      date_time: '2025-01-15T08:00:00',
    });
  });
});
