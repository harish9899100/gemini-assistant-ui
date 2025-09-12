import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;

// 🌦️ Fetch real weather from OpenWeather API
async function getWeather(city: string) {
  const API_KEY = process.env.OPENWEATHER_API_KEY as string;

  if (!API_KEY) {
    return { error: "Missing OpenWeather API key" };
  }

  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;

    const res = await fetch(URL);
    if (!res.ok) {
      return { error: `Weather API returned status ${res.status}` };
    }

    const data = await res.json();

    return {
      temperature: data.main?.temp ?? "N/A",
      description: data.weather?.[0]?.description ?? "N/A",
    };
  } catch (err) {
    return { error: "Failed to fetch weather data" };
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 🟢 Extract user message safely
  const lastMessage = messages[messages.length - 1];
  let userMessage = "";

  if (lastMessage?.content) {
    userMessage = lastMessage.content
      .filter((item: any) => item.type === "text")
      .map((item: any) => item.text)
      .join(" ");
  }

  console.log("👉 User message:", userMessage); // debug

  // 🟢 Weather intent
  if (userMessage && userMessage.toLowerCase().includes("weather")) {
    let city = "unknown";

    // ✅ Flexible regex: matches "what is the weather in Jaipur?" or "weather of Jaipur"
    const match = userMessage.match(/weather.*(?:in|of)\s+([a-zA-Z\s]+)/i);
    if (match) {
      city = match[1].trim().replace(/\?$/, ""); // remove trailing "?"
    }

    const weather = await getWeather(city);

    if ("error" in weather) {
      return NextResponse.json({
        role: "assistant",
        content: `❌ Sorry, I couldn't fetch weather data for ${city}.`,
      });
    }

    return NextResponse.json({
      role: "assistant",
      content: `🌤️ The weather in ${city} is ${weather.temperature}°C with ${weather.description}.`,
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
