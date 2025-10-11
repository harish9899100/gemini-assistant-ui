"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";

export default function Page() {
  // v1.1.0 expects no `api` prop here
  const runtime = useChatRuntime();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}


// // run `npx shadcn@latest add "https://r.assistant-ui.com/assistant-modal"`

// import { AssistantRuntimeProvider } from "@assistant-ui/react";
// import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
// import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

// const MyApp = () => {
//   const runtime = useChatRuntime({
//     api: "/api/chat",
//   });

//   return (
//     <AssistantRuntimeProvider runtime={runtime}>
//       <AssistantModal />
//     </AssistantRuntimeProvider>
//   );
// };



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
//       <div>
//         <ThreadList />
//         <Thread />
//       </div>
//     </AssistantRuntimeProvider>
//   );
// };



// "use client";

// import { AssistantRuntimeProvider } from "@assistant-ui/react";
// import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
// import { ThreadList } from "@/components/assistant-ui/thread-list";
// import { Thread } from "@/components/assistant-ui/thread";

// export default function Page() {
//   // v1.1.0 expects no `api` prop here
//   const runtime = useChatRuntime();

//   return (
//     <AssistantRuntimeProvider runtime={runtime}>
//       <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
//         <ThreadList />
//         <Thread />
//       </div>
//     </AssistantRuntimeProvider>
//   );
// }
