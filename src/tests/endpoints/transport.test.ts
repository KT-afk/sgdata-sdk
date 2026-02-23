// src/tests/endpoints/transport.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getCarparkAvailability,
  getTaxiAvailability,
  getTrafficImages,
} from '../../endpoints/transport';

type RequestFn = <T>(path: string, params?: Record<string, string>) => Promise<T>;

describe('transport endpoints', () => {
  let mockRequest: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRequest = vi.fn().mockResolvedValue({});
  });

  it('getCarparkAvailability calls correct path', async () => {
    await getCarparkAvailability(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/transport/carpark-availability', undefined);
  });

  it('getTaxiAvailability calls correct path', async () => {
    await getTaxiAvailability(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/transport/taxi-availability', undefined);
  });

  it('getTrafficImages calls correct path', async () => {
    await getTrafficImages(mockRequest as RequestFn);
    expect(mockRequest).toHaveBeenCalledWith('/transport/traffic-images', undefined);
  });

  it('getTaxiAvailability passes date_time param when provided', async () => {
    await getTaxiAvailability(mockRequest as RequestFn, { date_time: '2025-01-01T10:00:00' });
    expect(mockRequest).toHaveBeenCalledWith('/transport/taxi-availability', {
      date_time: '2025-01-01T10:00:00',
    });
  });
});
