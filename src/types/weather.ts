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

export interface WeatherForecast2HResponse {
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
}

export interface WeatherForecast24HResponse {
  items: Array<{
    update_timestamp: string;
    timestamp: string;
    valid_period: { start: string; end: string };
    general: {
      forecast: string;
      relative_humidity: { low: number; high: number };
      temperature: { low: number; high: number };
      wind: {
        speed: { low: number; high: number };
        direction: string;
      };
    };
    periods: Array<{
      time: { start: string; end: string };
      regions: {
        west: string;
        east: string;
        central: string;
        south: string;
        north: string;
      };
    }>;
  }>;
}

export interface WeatherForecast4DResponse {
  items: Array<{
    update_timestamp: string;
    timestamp: string;
    forecasts: Array<{
      date: string;
      forecast: string;
      relative_humidity: { low: number; high: number };
      temperature: { low: number; high: number };
      wind: {
        speed: { low: number; high: number };
        direction: string;
      };
    }>;
  }>;
}

export interface UVIndexReading {
  timestamp: string;
  update_timestamp: string;
  index: number;
}

export interface UVIndexResponse {
  items: UVIndexReading[];
}
