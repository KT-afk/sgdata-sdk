export class SGDataError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly endpoint: string
  ) {
    super(message);
    this.name = 'SGDataError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SGDataRateLimitError extends SGDataError {
  constructor(
    endpoint: string,
    public readonly retryAfter?: number
  ) {
    super('Rate limit exceeded', 429, endpoint);
    this.name = 'SGDataRateLimitError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
