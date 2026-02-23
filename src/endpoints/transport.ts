import type {
  CarparkAvailabilityResponse,
  TaxiAvailabilityResponse,
  TrafficImagesResponse,
} from '../types/transport';

type RequestFn = <T>(path: string, params?: Record<string, string>) => Promise<T>;

export interface DateTimeParam {
  date_time?: string;
}

export function getCarparkAvailability(
  request: RequestFn,
  params?: DateTimeParam
): Promise<CarparkAvailabilityResponse> {
  return request('/transport/carpark-availability', params?.date_time ? { date_time: params.date_time } : undefined);
}

export function getTaxiAvailability(
  request: RequestFn,
  params?: DateTimeParam
): Promise<TaxiAvailabilityResponse> {
  return request('/transport/taxi-availability', params?.date_time ? { date_time: params.date_time } : undefined);
}

export function getTrafficImages(
  request: RequestFn,
  params?: DateTimeParam
): Promise<TrafficImagesResponse> {
  return request('/transport/traffic-images', params?.date_time ? { date_time: params.date_time } : undefined);
}
