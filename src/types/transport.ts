export interface CarparkInfo {
  carpark_number: string;
  total_lots: string;
  lots_available: string;
  lot_type: string;
  update_datetime: string;
}

export interface CarparkAvailabilityResponse {
  items: Array<{
    timestamp: string;
    carpark_data: CarparkInfo[];
  }>;
}

export interface TaxiAvailabilityResponse {
  features: Array<{
    type: 'Feature';
    geometry: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
  }>;
}

export interface TrafficCamera {
  camera_id: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
}

export interface TrafficImagesResponse {
  items: Array<{
    timestamp: string;
    cameras: TrafficCamera[];
  }>;
}
