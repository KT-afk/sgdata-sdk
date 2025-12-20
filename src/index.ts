/**
 * SGData SDK - Modern TypeScript SDK for Singapore Government Open Data APIs
 * @see https://data.gov.sg
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface SGDataClientConfig {
  /**
   * Optional API key for higher rate limits
   * Sign up at https://data.gov.sg to get an API key
   */
  apiKey?: string;
}

export interface CarparkInfo {
  carpark_number: string;
  total_lots: string;
  lots_available: string;
  lot_type: string;
  update_datetime: string;
}

export interface WeatherArea {
  name: string;
  label_location: {
    latitude: number;
    longitude: number;
  };
}

export interface WeatherForecast {
  area: string;
  forecast: string;
}

export interface PSIReading {
  west: number;
  east: number;
  central: number;
  south: number;
  north: number;
  national: number;
}

export interface TemperatureReading {
  station_id: string;
  value: number;
}

export interface RainfallReading {
  station_id: string;
  value: number;
}

export interface HumidityReading {
  station_id: string;
  value: number;
}

export interface UVIndexReading {
  timestamp: string;
  update_timestamp: string;
  index: number;
}

// ============================================================================
// MAIN CLIENT
// ============================================================================

export class SGDataClient {
  private baseUrl = 'https://api.data.gov.sg/v1';
  private apiKey?: string;

  /**
   * Create a new SGData client
   * 
   * @param config - Optional configuration
   * @example
   * // Without API key (default rate limits)
   * const client = new SGDataClient();
   * 
   * @example
   * // With API key (higher rate limits)
   * const client = new SGDataClient({ apiKey: 'your-api-key' });
   */
  constructor(config?: SGDataClientConfig) {
    this.apiKey = config?.apiKey;
  }

  /**
   * Internal method to make API requests
   */
  private async request<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add API key to headers if provided
    if (this.apiKey) {
      headers['X-Api-Key'] = this.apiKey;
    }

    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(
          `SGData API Error: ${response.status} - ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred while fetching data');
    }
  }

  // ==========================================================================
  // TRANSPORT APIs
  // ==========================================================================

  /**
   * Get real-time carpark availability across Singapore
   * Updated every minute
   * Rate limit: 60 requests per minute (with API key)
   * 
   * @example
   * const data = await client.getCarparkAvailability();
   * console.log(data.items[0].carpark_data);
   */
  async getCarparkAvailability(): Promise<{
    items: Array<{
      timestamp: string;
      carpark_data: CarparkInfo[];
    }>;
  }> {
    return this.request('/transport/carpark-availability');
  }

  // ==========================================================================
  // WEATHER FORECAST APIs
  // ==========================================================================

  /**
   * Get 2-hour weather forecast
   * Updated every 30 minutes
   * 
   * @example
   * const forecast = await client.getWeatherForecast2H();
   * console.log(forecast.items[0].forecasts);
   */
  async getWeatherForecast2H(): Promise<{
    area_metadata: WeatherArea[];
    items: Array<{
      update_timestamp: string;
      timestamp: string;
      valid_period: {
        start: string;
        end: string;
      };
      forecasts: WeatherForecast[];
    }>;
  }> {
    return this.request('/environment/2-hour-weather-forecast');
  }

  /**
   * Get 24-hour weather forecast
   * Updated multiple times throughout the day
   * 
   * @example
   * const forecast = await client.getWeatherForecast24H();
   */
  async getWeatherForecast24H(): Promise<any> {
    return this.request('/environment/24-hour-weather-forecast');
  }

  /**
   * Get 4-day weather forecast
   * Updated twice daily
   * 
   * @example
   * const forecast = await client.getWeatherForecast4D();
   */
  async getWeatherForecast4D(): Promise<any> {
    return this.request('/environment/4-day-weather-forecast');
  }

  // ==========================================================================
  // ENVIRONMENT APIs
  // ==========================================================================

  /**
   * Get current PSI (Pollutant Standards Index) readings
   * Air quality index across Singapore
   * Updated every 15 minutes
   * 
   * @example
   * const psi = await client.getPSI();
   * console.log(psi.items[0].readings.psi_twenty_four_hourly);
   */
  async getPSI(): Promise<{
    region_metadata: Array<{
      name: string;
      label_location: {
        latitude: number;
        longitude: number;
      };
    }>;
    items: Array<{
      timestamp: string;
      update_timestamp: string;
      readings: {
        psi_twenty_four_hourly: PSIReading;
        psi_three_hourly: PSIReading;
      };
    }>;
  }> {
    return this.request('/environment/psi');
  }

  /**
   * Get real-time air temperature across Singapore
   * Updated every 5 minutes
   * 
   * @example
   * const temp = await client.getTemperature();
   * console.log(temp.items[0].readings);
   */
  async getTemperature(): Promise<{
    metadata: {
      stations: Array<{
        id: string;
        device_id: string;
        name: string;
        location: {
          latitude: number;
          longitude: number;
        };
      }>;
    };
    items: Array<{
      timestamp: string;
      readings: TemperatureReading[];
    }>;
  }> {
    return this.request('/environment/air-temperature');
  }

  /**
   * Get rainfall readings across Singapore
   * Updated every 5 minutes
   * 
   * @example
   * const rainfall = await client.getRainfall();
   */
  async getRainfall(): Promise<{
    metadata: {
      stations: Array<{
        id: string;
        device_id: string;
        name: string;
        location: {
          latitude: number;
          longitude: number;
        };
      }>;
    };
    items: Array<{
      timestamp: string;
      readings: RainfallReading[];
    }>;
  }> {
    return this.request('/environment/rainfall');
  }

  /**
   * Get relative humidity readings
   * Updated every minute
   * 
   * @example
   * const humidity = await client.getHumidity();
   */
  async getHumidity(): Promise<{
    metadata: {
      stations: Array<{
        id: string;
        device_id: string;
        name: string;
        location: {
          latitude: number;
          longitude: number;
        };
      }>;
    };
    items: Array<{
      timestamp: string;
      readings: HumidityReading[];
    }>;
  }> {
    return this.request('/environment/relative-humidity');
  }

  /**
   * Get UV index readings
   * Updated hourly between 7AM and 7PM
   * 
   * @example
   * const uv = await client.getUVIndex();
   */
  async getUVIndex(): Promise<{
    items: Array<UVIndexReading>;
  }> {
    return this.request('/environment/uv-index');
  }
}