import { SGDataError, SGDataRateLimitError } from './errors';

const RETRY_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

export interface SGDataClientConfig {
  apiKey?: string;
  retries?: number;
  retryDelay?: number; // base delay in ms (doubles each retry)
}

export class BaseClient {
  private readonly baseUrl = 'https://api.data.gov.sg/v1';
  private readonly apiKey?: string;
  private readonly retries: number;
  private readonly retryDelay: number;

  constructor(config?: SGDataClientConfig) {
    this.apiKey = config?.apiKey;
    this.retries = config?.retries ?? 3;
    this.retryDelay = config?.retryDelay ?? 1000;
  }

  protected async request<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['X-Api-Key'] = this.apiKey;
    }

    let lastError: SGDataError | undefined;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      if (attempt > 0) {
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const response = await fetch(url.toString(), { headers });

      if (response.ok) {
        return response.json() as Promise<T>;
      }

      if (response.status === 429) {
        const retryAfterHeader = response.headers.get('Retry-After');
        const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined;
        lastError = new SGDataRateLimitError(endpoint, retryAfter);
      } else {
        lastError = new SGDataError(
          `SGData API Error: ${response.status} - ${response.statusText}`,
          response.status,
          endpoint
        );
      }

      // Don't retry on client errors (4xx except 429)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        break;
      }
    }

    throw lastError!;
  }
}
