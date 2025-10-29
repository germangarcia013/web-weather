export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("q");

  if (!city) {
    return new Response("Missing query", { status: 400 });
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${city}`,
    {
      headers: {
        "User-Agent": "YourAppName/1.0 (your@email.com)",
      },
    }
  );

  const data = await res.json();
  return Response.json(data);
}
