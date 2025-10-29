import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import { WeatherData } from "../types/Types";

export function useWeatherData(latitude: number, longitude: number) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          latitude,
          longitude,
          current: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "wind_speed_10m",
            "precipitation",
          ],
          daily: [
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
            "wind_speed_10m_max",
            "weather_code",
          ],
          hourly: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "wind_speed_10m",
            "precipitation",
            "weather_code",
          ],
          timezone: "America/Sao_Paulo",
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses: any[] = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffset = response.utcOffsetSeconds();
        const toDate = (unix: number) => new Date((unix + utcOffset) * 1000);

        const current = response.current();
        const daily = response.daily();
        const hourly = response.hourly();

        const dailySteps = daily.variables(0).valuesArray().length;
        const hourlySteps = hourly.variables(0).valuesArray().length;

        const weather: WeatherData = {
          metadata: {
            latitude: response.latitude(),
            longitude: response.longitude(),
            elevation: response.elevation(),
            timezone: response.timezone(),
            timezoneAbbreviation: response.timezoneAbbreviation(),
            utcOffsetSeconds: utcOffset,
          },
          current: {
            time: toDate(Number(current.time())),
            temperature_2m: current.variables(0).value(),
            apparent_temperature: current.variables(1).value(),
            relative_humidity_2m: current.variables(2).value(),
            wind_speed_10m: current.variables(3).value(),
            precipitation: current.variables(4).value(),
          },
          daily: {
            time: Array.from({ length: dailySteps }, (_, i) =>
              toDate(Number(daily.time()) + i * 86400)
            ),
            temperature_2m_max: daily.variables(0).valuesArray(),
            temperature_2m_min: daily.variables(1).valuesArray(),
            precipitation_sum: daily.variables(2).valuesArray(),
            wind_speed_10m_max: daily.variables(3).valuesArray(),
            weather_code: daily.variables(4).valuesArray(),
          },
          hourly: {
            time: Array.from({ length: hourlySteps }, (_, i) =>
              toDate(Number(hourly.time()) + i * hourly.interval())
            ),
            temperature_2m: hourly.variables(0).valuesArray(),
            apparent_temperature: hourly.variables(1).valuesArray(),
            relative_humidity_2m: hourly.variables(2).valuesArray(),
            wind_speed_10m: hourly.variables(3).valuesArray(),
            precipitation: hourly.variables(4).valuesArray(),
            weather_code: hourly.variables(5).valuesArray(),
          },
        };

        setData(weather);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [latitude, longitude]);

  return { data, loading };
}
