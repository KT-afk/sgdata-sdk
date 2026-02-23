export interface RegionReading {
  west: number;
  east: number;
  central: number;
  south: number;
  north: number;
  national: number;
}

export interface PSIResponse {
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
      psi_twenty_four_hourly: RegionReading;
      psi_three_hourly: RegionReading;
    };
  }>;
}

export interface WeatherStation {
  id: string;
  device_id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface TemperatureReading {
  station_id: string;
  value: number;
}

export interface TemperatureResponse {
  metadata: { stations: WeatherStation[] };
  items: Array<{
    timestamp: string;
    readings: TemperatureReading[];
  }>;
}

export interface RainfallReading {
  station_id: string;
  value: number;
}

export interface RainfallResponse {
  metadata: { stations: WeatherStation[] };
  items: Array<{
    timestamp: string;
    readings: RainfallReading[];
  }>;
}

export interface HumidityReading {
  station_id: string;
  value: number;
}

export interface HumidityResponse {
  metadata: { stations: WeatherStation[] };
  items: Array<{
    timestamp: string;
    readings: HumidityReading[];
  }>;
}
