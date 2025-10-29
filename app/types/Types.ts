export interface CurrentWeather {
  time: Date;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
}

export interface DailyForecast {
  time: Date[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
  weather_code: number[];
}

export interface HourlyForecast {
  time: Date[];
  temperature_2m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
  precipitation: number[];
  weather_code: number[];
}

export interface WeatherMetadata {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezoneAbbreviation: string;
  utcOffsetSeconds: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast;
  hourly: HourlyForecast;
  metadata: WeatherMetadata;
}

export type WeatherCard = {
  title: string;
  value: string;
};
