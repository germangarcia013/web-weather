export const formatTemp = (value: number) => `${Math.round(value)}°`;

export const formatWind = (value: number) => `${Math.round(value)} km/h`;

export const formatPrecip = (value: number) => `${value.toFixed(0)} mm`;

export const formatHumity = (value: number) => `${Math.round(value)}%`;

export const getFirstAndLastCity = (text: string): string => {
  const city = text.split(",");
  const fullCity = `${city[0]}, ${city[city.length - 1]}`;
  return fullCity;
};
