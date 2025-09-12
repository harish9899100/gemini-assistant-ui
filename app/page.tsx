// "use client";
// import { google } from "@ai-sdk/google";
// import { convertToModelMessages, streamText } from "ai";
// import { NextResponse } from "next/server";

// export const maxDuration = 30;

// const API_KEY = process.env.OPENWEATHER_API_KEY as string;

// async function getWeather(city: string) {
//   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
//   const res = await fetch(URL);
//   if (!res.ok) return { error: "Unable to fetch weather" };
//   const data = await res.json();
//   return {
//     temperature: data.main.temp,
//     description: data.weather[0].description,
//   };
// }

// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const userMessage = messages[messages.length - 1].content as string;

//   // 🟢 Check if user asks for weather
//   if (userMessage.toLowerCase().includes("weather")) {
//     const words = userMessage.split(" ");
//     const city = words[words.length - 1]; // crude extraction

//     const weather = await getWeather(city);
//     return NextResponse.json({
//       role: "assistant",
//       content: `The weather in ${city} is ${weather.temperature}°C with ${weather.description}.`,
//     });
//   }

//   // 🟢 Otherwise, use Gemini
//   const result = streamText({
//     model: google("gemini-1.5-flash"),
//     messages: convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();
// }











"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";

export default function Page() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}





// "use client";

// import { AssistantRuntimeProvider } from "@assistant-ui/react";
// import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
// import { ThreadList } from "@/components/assistant-ui/thread-list";
// import { Thread } from "@/components/assistant-ui/thread";

// export default function Page() {
//   const runtime = useChatRuntime({
//     api: "/api/chat",
//   });

//   return (
//     <AssistantRuntimeProvider runtime={runtime}>
//       <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
//         <ThreadList />
//         <Thread />
//       </div>
//     </AssistantRuntimeProvider>
//   );
// }




// import { AssistantRuntimeProvider } from "@assistant-ui/react";
// import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
// import { ThreadList } from "@/components/assistant-ui/thread-list";
// import { Thread } from "@/components/assistant-ui/thread";

// export default function Page() {
//   const runtime = useChatRuntime({
//     api: "/api/chat",
//   });

//   return (
//     <AssistantRuntimeProvider runtime={runtime}>
//       <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
//         <ThreadList />
//         <Thread />
//       </div>
//     </AssistantRuntimeProvider>
//   );
// }




// import { AssistantRuntimeProvider } from "@assistant-ui/react";
// import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
// import { ThreadList } from "@/components/assistant-ui/thread-list";
// import { Thread } from "@/components/assistant-ui/thread";

// const MyApp = () => {
//   const runtime = useChatRuntime({
//     api: "/api/chat",
//   });

//   return (
//     <AssistantRuntimeProvider runtime={runtime}>
//       <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
//         <ThreadList />
//         <Thread />
//       </div>
//     </AssistantRuntimeProvider>
//   );
// };






// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

// "use client";

// import { AssistantRuntimeProvider } from "@assistant-ui/react";
// import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";
// import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

// export default function Page() {
//   const runtime = useChatRuntime({
//     transport: new AssistantChatTransport({
//       api: "/api/chat", // your backend API endpoint
//     }),
//   });

//   return (
//     <AssistantRuntimeProvider runtime={runtime}>
//       <AssistantModal />
//     </AssistantRuntimeProvider>
//   );
// }

// "use client";

// import { AssistantFrameProvider, AssistantRuntimeProvider } from "@assistant-ui/react";
// import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";
// import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

// export default function Page() {
//   const runtime = useChatRuntime({
//     transport: new AssistantChatTransport({
//       api: "/api/chat", // Your Next.js API route
//     }),
//   });

//   return (
//     <AssistantFrameProvider>
//       <AssistantRuntimeProvider runtime={runtime}>
//         <AssistantModal />
//       </AssistantRuntimeProvider>
//     </AssistantFrameProvider>
//   );
// }


// "use client";

// import { AssistantRuntimeProvider } from "@assistant-ui/react";
// import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";
// import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

// export default function Page() {
//   const runtime = useChatRuntime({
//     transport: new AssistantChatTransport({ api: "/api/chat" }),
//   });

//   return (
//     <AssistantRuntimeProvider runtime={runtime}>
//       <AssistantModal />
//     </AssistantRuntimeProvider>
//   );
// }
