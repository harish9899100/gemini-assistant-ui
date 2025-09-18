import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;

// 🌦️ Fetch real weather from OpenWeather API
async function getWeather(city: string) {
  const API_KEY = process.env.OPENWEATHER_API_KEY as string;

  if (!API_KEY) {
    return { error: "❌ Missing OpenWeather API key on server" };
  }

  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;

    const res = await fetch(URL);
    const data = await res.json();

    if (!res.ok) {
      return { error: data?.message || `Weather API error (${res.status})` };
    }

    return {
      temperature: data.main?.temp ?? "N/A",
      feels_like: data.main?.feels_like ?? "N/A",
      humidity: data.main?.humidity ?? "N/A",
      description: data.weather?.[0]?.description ?? "N/A",
      city: data.name ?? city,
      country: data.sys?.country ?? "",
    };
  } catch (err: any) {
    return { error: err.message || "❌ Failed to fetch weather data" };
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 🟢 Extract last user message safely
  const lastMessage = messages[messages.length - 1];
  let userMessage = "";

  if (Array.isArray(lastMessage?.content)) {
    // Assistant UI sends messages like [{ type: "text", text: "..." }]
    userMessage = lastMessage.content
      .map((item: any) => (item.type === "text" ? item.text : ""))
      .join(" ");
  } else if (typeof lastMessage?.content === "string") {
    // fallback if content is plain string
    userMessage = lastMessage.content;
  }

  console.log("👉 User message:", userMessage);

  // 🟢 Detect weather intent
  if (userMessage && userMessage.toLowerCase().includes("weather")) {
    let city = "unknown";

    // ✅ Flexible regex to catch: "weather in Jaipur", "weather of Jaipur", "Jaipur weather"
    const match = userMessage.match(
      /\bweather\b.*?(?:in|of)?\s*([a-zA-Z\s]+)\??$/i
    ) || userMessage.match(/([a-zA-Z\s]+)\s+weather/i);

    if (match) {
      city = match[1].trim();
    }

    console.log("👉 Extracted city:", city);

    const weather = await getWeather(city);

    if ("error" in weather) {
      return NextResponse.json({
        role: "assistant",
        content: `❌ Sorry, I couldn't fetch weather data for "${city}". (${weather.error})`,
      });
    }

    return NextResponse.json({
      role: "assistant",
      content: `🌤️ Weather in ${weather.city}, ${weather.country}:
- Temperature: ${weather.temperature}°C
- Feels like: ${weather.feels_like}°C
- Condition: ${weather.description}
- Humidity: ${weather.humidity}%`,
    });
  }

  // 🟢 Otherwise, fallback to Gemini
  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}











// import { google } from "@ai-sdk/google";
// import { convertToModelMessages, streamText } from "ai";

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const result = streamText({
//     model: google("gemini-1.5-flash"),
//     messages: convertToModelMessages(messages),
//   });
//   return result.toUIMessageStreamResponse();
// }
