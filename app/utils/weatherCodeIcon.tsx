import iconsStorm from "@/app/assets/images/icon-storm.webp";
import iconRain from "@/app/assets/images/icon-rain.webp";
import iconPartlyCloudy from "@/app/assets/images/icon-partly-cloudy.webp";
import iconFog from "@/app/assets/images/icon-fog.webp";
import iconDrizzle from "@/app/assets/images/icon-drizzle.webp";
import iconSunny from "@/app/assets/images/icon-sunny.webp";
import Image from "next/image";

export function getWeatherIcon(weathercode: number) {
  if (weathercode === 0) return <Image src={iconSunny} alt="Ceu limpo" />;

  if (weathercode >= 1 && weathercode <= 3)
    return <Image src={iconPartlyCloudy} alt="parcialmente nublado" />;

  if (weathercode >= 45 && weathercode <= 48)
    return <Image src={iconFog} alt="Neblina" />;

  if (weathercode >= 51 && weathercode <= 67)
    return <Image src={iconDrizzle} alt="chuva fraca" />;

  if (weathercode >= 80 && weathercode <= 82)
    return <Image src={iconRain} alt="chuva forte" />;

  if (weathercode >= 95 && weathercode <= 99)
    return <Image src={iconsStorm} alt="tempestade" />;

  return "Not found image";
}
