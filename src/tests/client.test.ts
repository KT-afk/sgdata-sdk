// src/tests/client.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseClient } from '../client';
import { SGDataError, SGDataRateLimitError } from '../errors';

// Concrete subclass to expose protected `request` for testing
class TestClient extends BaseClient {
  public fetch<T>(endpoint: string, params?: Record<string, string>) {
    return this.request<T>(endpoint, params);
  }
}

describe('BaseClient.request', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calls correct URL with no params', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'ok' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const client = new TestClient();
    await client.fetch('/environment/psi');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.data.gov.sg/v1/environment/psi',
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it('appends query params to URL', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });
    vi.stubGlobal('fetch', mockFetch);

    const client = new TestClient();
    await client.fetch('/environment/psi', { date_time: '2025-01-01T00:00:00' });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.data.gov.sg/v1/environment/psi?date_time=2025-01-01T00%3A00%3A00',
      expect.any(Object)
    );
  });

  it('includes X-Api-Key header when apiKey is set', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });
    vi.stubGlobal('fetch', mockFetch);

    const client = new TestClient({ apiKey: 'test-key' });
    await client.fetch('/environment/psi');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ 'X-Api-Key': 'test-key' }),
      })
    );
  });

  it('throws SGDataRateLimitError on 429', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
      headers: { get: () => null },
    });
    vi.stubGlobal('fetch', mockFetch);

    const client = new TestClient({ retries: 0 });
    await expect(client.fetch('/environment/psi')).rejects.toThrow(SGDataRateLimitError);
  });

  it('throws SGDataError on 404', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: { get: () => null },
    });
    vi.stubGlobal('fetch', mockFetch);

    const client = new TestClient({ retries: 0 });
    await expect(client.fetch('/bad-endpoint')).rejects.toThrow(SGDataError);
  });

  it('retries on 500 and eventually succeeds', async () => {
    let callCount = 0;
    const mockFetch = vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount < 3) {
        return Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          headers: { get: () => null },
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
    });
    vi.stubGlobal('fetch', mockFetch);

    const client = new TestClient({ retries: 3, retryDelay: 0 }); // retryDelay: 0 to skip waiting in tests
    const result = await client.fetch('/environment/psi');

    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(result).toEqual({ success: true });
  });

  it('throws after exhausting retries', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
      headers: { get: () => null },
    });
    vi.stubGlobal('fetch', mockFetch);

    const client = new TestClient({ retries: 2, retryDelay: 0 });
    await expect(client.fetch('/environment/psi')).rejects.toThrow(SGDataError);
    expect(mockFetch).toHaveBeenCalledTimes(3); // initial + 2 retries
  });
});
