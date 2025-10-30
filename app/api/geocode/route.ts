// app/api/geocode/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("q");

  if (!city) {
    return new Response("Missing query", { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        city
      )}`,
      {
        headers: {
          "User-Agent": "MyWeatherApp/1.0 (meu@email.com)",
        },
      }
    );

    if (!res.ok) {
      return new Response("Failed to fetch geocode data", {
        status: res.status,
      });
    }

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return Response.json(data);
    } catch (err) {
      console.error("Erro ao fazer parse do JSON:", err);
      return new Response("Invalid JSON response from geocoding API", {
        status: 502,
      });
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
