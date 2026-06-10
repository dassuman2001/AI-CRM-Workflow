import { useState, useRef, useEffect } from "react";

import MainLayout from "../../layouts/MainLayout";

import { copilotChat } from "../../api/ai.api";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";




export default function CopilotPage() {

const [message, setMessage] =
useState("");

const [loading, setLoading] =
useState(false);

const [messages, setMessages] =
useState<any[]>([
{
role: "assistant",
content:
"👋 Welcome to AI CRM Copilot.\n\nI can help with:\n• Lead prioritization\n• Pipeline summaries\n• Sales insights\n• Follow-up recommendations\n• Task analysis\n\nTry asking a question below.",
},
]);

const bottomRef =
useRef<HTMLDivElement>(null);

useEffect(() => {


bottomRef.current?.scrollIntoView({
  behavior: "smooth",
});


}, [messages]);

const sendMessage = async () => {


if (!message.trim()) return;

const userMessage = {
  role: "user",
  content: message,
};

setMessages((prev) => [
  ...prev,
  userMessage,
]);

const currentMessage = message;

setMessage("");

setLoading(true);

try {

  const response =
    await copilotChat(
      currentMessage
    );

  const aiMessage = {

    role: "assistant",

    content:
      response.answer ||
      response.response ||
      response.result ||
      "No response",

  };

  setMessages((prev) => [
    ...prev,
    aiMessage,
  ]);

} catch (error) {

  console.error(error);

  setMessages((prev) => [

    ...prev,

    {
      role: "assistant",

      content:
        "⚠️ AI service is temporarily unavailable. Please try again in a few moments.",
    },

  ]);

} finally {

  setLoading(false);

}


};

return (


<MainLayout>

  <h1 className="text-3xl font-bold mb-6">

    AI Copilot

  </h1>

  <div className="flex flex-wrap gap-2 mb-4">

    {[
      "Which lead should I contact first?",
      "Summarize my pipeline",
      "Show high priority leads",
      "What tasks are pending?",
    ].map((prompt) => (

      <button
        key={prompt}
        onClick={() =>
          setMessage(prompt)
        }
        className="
          border
          rounded-full
          px-4
          py-2
          text-sm
          hover:bg-gray-100
        "
      >
        {prompt}
      </button>

    ))}

  </div>

  <div className="bg-white border rounded-xl shadow-sm h-[650px] flex flex-col">

    <div className="flex-1 overflow-y-auto p-4 space-y-4">

      {messages.map(

        (msg, index) => (

          <div
            key={index}
            className={
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }
          >

            <div

              className={
                msg.role === "user"

                  ? `
                    inline-block
                    bg-blue-600
                    text-white
                    px-4
                    py-3
                    rounded-2xl
                    max-w-[70%]
                    whitespace-pre-wrap
                    break-words
                  `

                  : `
                    inline-block
                    bg-gray-100
                    text-gray-800
                    px-4
                    py-3
                    rounded-2xl
                    max-w-[85%]
                    whitespace-pre-wrap
                    break-words
                    shadow-sm
                  `
              }

            >

  <ReactMarkdown remarkPlugins={[remarkGfm]}>
  {msg.content}
</ReactMarkdown>

            </div>

          </div>

        )

      )}

      {loading && (

        <div className="text-left">

          <div
            className="
              inline-block
              bg-gray-100
              px-4
              py-3
              rounded-2xl
              text-gray-500
            "
          >

            AI CRM Copilot is analyzing...

          </div>

        </div>

      )}

      <div ref={bottomRef} />

    </div>

    <div className="border-t p-4 flex gap-3">

      <input

        value={message}

        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }

        onKeyDown={(e) => {

          if (
            e.key === "Enter" &&
            !loading
          ) {

            sendMessage();

          }

        }}

        placeholder="Ask AI..."

        className="
          flex-1
          border
          rounded-lg
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-purple-500
        "

      />

      <button

        onClick={sendMessage}

        disabled={loading}

        className="
          bg-purple-600
          hover:bg-purple-700
          text-white
          px-6
          py-3
          rounded-lg
          disabled:opacity-50
        "

      >

        Send

      </button>

    </div>

  </div>

</MainLayout>


);

}
