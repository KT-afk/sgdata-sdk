// src/tests/errors.test.ts
import { describe, it, expect } from 'vitest';
import { SGDataError, SGDataRateLimitError } from '../errors';

describe('SGDataError', () => {
  it('sets name, message, statusCode, endpoint', () => {
    const err = new SGDataError('not found', 404, '/environment/psi');
    expect(err.name).toBe('SGDataError');
    expect(err.message).toBe('not found');
    expect(err.statusCode).toBe(404);
    expect(err.endpoint).toBe('/environment/psi');
    expect(err instanceof Error).toBe(true);
  });
});

describe('SGDataRateLimitError', () => {
  it('sets statusCode to 429 and retryAfter if provided', () => {
    const err = new SGDataRateLimitError('/transport/taxi-availability', 30);
    expect(err.name).toBe('SGDataRateLimitError');
    expect(err.statusCode).toBe(429);
    expect(err.endpoint).toBe('/transport/taxi-availability');
    expect(err.retryAfter).toBe(30);
    expect(err instanceof SGDataError).toBe(true);
  });

  it('works without retryAfter', () => {
    const err = new SGDataRateLimitError('/environment/psi');
    expect(err.retryAfter).toBeUndefined();
  });
});
