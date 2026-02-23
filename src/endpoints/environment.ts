import type {
  PSIResponse,
  TemperatureResponse,
  RainfallResponse,
  HumidityResponse,
} from '../types/environment';
import type { DateTimeParam } from './transport';

type RequestFn = <T>(path: string, params?: Record<string, string>) => Promise<T>;

function toParams(p?: DateTimeParam): Record<string, string> | undefined {
  return p?.date_time ? { date_time: p.date_time } : undefined;
}

export function getPSI(
  request: RequestFn,
  params?: DateTimeParam
): Promise<PSIResponse> {
  return request('/environment/psi', toParams(params));
}

export function getTemperature(
  request: RequestFn,
  params?: DateTimeParam
): Promise<TemperatureResponse> {
  return request('/environment/air-temperature', toParams(params));
}

export function getRainfall(
  request: RequestFn,
  params?: DateTimeParam
): Promise<RainfallResponse> {
  return request('/environment/rainfall', toParams(params));
}

export function getHumidity(
  request: RequestFn,
  params?: DateTimeParam
): Promise<HumidityResponse> {
  return request('/environment/relative-humidity', toParams(params));
}
