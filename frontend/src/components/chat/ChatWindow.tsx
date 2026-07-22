"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function ChatWindow({ messages }: any) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center text-center px-6">

                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-5xl shadow-xl">
                    🤖
                </div>

                <h1 className="text-5xl font-bold mt-8">
                    Sameer AI
                </h1>

                <p className="text-gray-400 mt-4 text-lg">
                    Your Personal AI Assistant
                </p>

                <p className="text-gray-500 mt-2 max-w-xl">
                    I can help you manage Gmail, Google Calendar, Google Tasks,
                    Google Docs, expenses, weather, web search and much more.
                </p>

            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-8 py-8">

            <div className="max-w-5xl mx-auto space-y-8">

                {messages.map((msg: any, index: number) => (

                    <div
                        key={index}
                        className={`flex ${
                            msg.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >

                        <div
                            className={`flex items-end gap-3 max-w-[80%] ${
                                msg.role === "user"
                                    ? "flex-row-reverse"
                                    : ""
                            }`}
                        >

                            {/* Avatar */}

                            <div
                                className={`w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0 ${
                                    msg.role === "user"
                                        ? "bg-blue-600"
                                        : "bg-gray-700"
                                }`}
                            >
                                {msg.role === "user" ? "👤" : "🤖"}
                            </div>


                            {/* Bubble */}

                            <div
                                className={`rounded-2xl px-5 py-4 shadow-lg whitespace-pre-wrap break-words ${
                                    msg.role === "user"
                                        ? "bg-blue-600 text-white rounded-br-md"
                                        : "bg-gray-800 border border-gray-700 text-white rounded-bl-md"
                                }`}
                            >

                                <div className="prose prose-invert max-w-none prose-p:my-3 prose-headings:my-4 prose-ul:my-3 prose-li:my-1">

                                    {msg.role === "assistant" ? (

                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeHighlight]}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>

                                    ) : (

                                        <p>
                                            {msg.content}
                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

                <div ref={bottomRef} />

            </div>

        </div>
    );
}