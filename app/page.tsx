"use client";
import { Header } from "./components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import search from "@/app/assets/images/icon-search.svg";
import Image from "next/image";
import bgToday from "@/app/assets/images/bg-today-large.png";
import iconSnow from "@/app/assets/images/icon-snow.webp";
import iconSunny from "@/app/assets/images/icon-sunny.webp";
import { useState } from "react";
import { useWeatherData } from "./utils/useWatherData";
import {
  formatHumity,
  formatPrecip,
  formatTemp,
  formatWind,
  getFirstAndLastCity,
} from "./utils/Format";
import { WeatherCard } from "./types/Types";
import { Spinner } from "@/components/ui/spinner";
import { getWeatherIcon } from "./utils/weatherCodeIcon";

export default function Home() {
  const [cityInput, setCityInput] = useState("");
  const [cityName, setCityName] = useState("Berlin, Germany");
  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: 52.52,
    lon: 13.405,
  });
  const { data, loading } = useWeatherData(coords.lat, coords.lon);

  const weatherInfo: WeatherCard[] = [
    {
      title: "Feels Like",
      value: formatTemp(Number(data?.current.apparent_temperature)),
    },
    {
      title: "Humidity",
      value: formatHumity(Number(data?.current.relative_humidity_2m)),
    },
    {
      title: "Wind",
      value: formatWind(Number(data?.current.wind_speed_10m)),
    },
    {
      title: "Precipitation",
      value: formatPrecip(Number(data?.current.precipitation)),
    },
  ];

  console.log(data?.current.precipitation);

  const handleSearch = async () => {
    if (!cityInput) return;

    try {
      const res = await fetch(
        `/api/geocode?q=${encodeURIComponent(cityInput)}`
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro na API:", errorText);
        return;
      }

      const text = await res.text();

      if (!text || text.trim() === "") {
        console.error("Resposta vazia da API");
        return;
      }

      const data: any[] = JSON.parse(text);

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setCoords({ lat, lon });
        setCityName(data[0].display_name);
      } else {
        console.warn("Nenhum resultado encontrado para:", cityInput);
      }
    } catch (err) {
      console.error("Erro ao buscar geolocalização:", err);
    }
  };
  return (
    <div className="w-[1240px] h-screen flex flex-col px-4 ">
      <Header />
      <div className="h-32 flex flex-col items-center justify-center gap-6 ">
        <h1 className="text-5xl text-white">How's the sky looking today?</h1>

        <div className="flex max-w-xl items-center gap-6 w-full relative  ">
          <Image src={search} alt="" className="absolute  px-2 w-9 " />
          <Input
            type="email"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Search for a place..."
            className=" pl-9 text-white h-12 bg-[hsl(243,23%,24%)] border-none "
          />
          <Button
            type="submit"
            onClick={handleSearch}
            variant="outline"
            className="cursor-pointer h-12"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="flex mt-12 ">
        <div className="flex flex-col text-white w-[65%] justify-between gap-8 ">
          <div className="relative w-full">
            {loading ? (
              <div className="w-full rounded-3xl h-[277px] bg-[hsl(243,27%,20%)] flex flex-col justify-center items-center">
                <Spinner />
                Loading...
              </div>
            ) : (
              <div>
                <Image src={bgToday} alt="" className="w-full rounded-3xl" />
                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center p-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-2xl">
                      {getFirstAndLastCity(cityName)}
                    </p>
                    <p className="text-sm">
                      {data?.current.time.toDateString()}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <Image src={iconSunny} alt="" className="" width={100} />
                    <p className="text-7xl">
                      {formatTemp(Number(data?.current.temperature_2m))}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex w-full justify-between flex-wrap gap-4">
            {weatherInfo.map((item, index) => (
              <div key={index}>
                {loading ? (
                  <div className="bg-[hsl(243,27%,20%)] h-24 w-44 p-4 gap-2 flex flex-col rounded-md border border-neutral-700 " />
                ) : (
                  <div className="bg-[hsl(243,27%,20%)] h-24 w-44 p-4 gap-2 flex flex-col rounded-md border border-neutral-700">
                    <h2 className="text-gray-400">{item.title}</h2>
                    <p className="text-2xl text-white">{item.value}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-white text-2xl">Daily forecast</h3>
            <div className="flex justify-between ">
              {(loading
                ? Array.from({ length: 7 })
                : data?.daily.time ?? []
              ).map((day, index) => (
                <div key={index}>
                  {loading ? (
                    <div className="w-24 bg-[hsl(243,27%,20%)]  p-4 rounded-md h-[140px] " />
                  ) : (
                    <div className="w-24 bg-[hsl(243,27%,20%)] p-4 rounded-md h-[140px]  ">
                      <h2 className="text-center">
                        {new Date(day as number).toDateString().slice(0, 3)}
                      </h2>

                      {getWeatherIcon(Number(data?.daily.weather_code[index]))}

                      <div className="flex justify-between text-sm gap-3">
                        <p>
                          {formatTemp(
                            Number(data?.daily.temperature_2m_max[index])
                          )}
                        </p>
                        <p>
                          {formatTemp(
                            Number(data?.daily.temperature_2m_min[index])
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" w-[30%] ml-11 p-5 rounded-3xl flex flex-col gap-3 justify-between text-white bg-[hsl(243,27%,20%)]">
          <h2 className="text-white text-xl">Hourly forecast</h2>

          {data?.hourly.time.slice(15, 23).map((hour, index) => (
            <div
              key={index}
              className="bg-[hsl(243,23%,24%)] flex h-14 rounded-sm items-center justify-between px-4"
            >
              <div className="flex items-center">
                <div className="w-10">
                  {getWeatherIcon(Number(data?.hourly.weather_code[index]))}
                </div>

                <p>{hour.getHours()}h</p>
              </div>
              <p>{formatTemp(data.hourly.temperature_2m[index + 15])}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
