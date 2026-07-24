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

                {/* Glowing Holographic Orb with N. Emblem */}
                <div className="relative mb-2 flex items-center justify-center">
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-40 blur-xl animate-pulse" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#080d1a] via-[#0b1329] to-[#0d162d] border border-cyan-500/50 p-1 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)]">
                        <span
                            style={{ fontFamily: "'Playfair Display', serif" }}
                            className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                        >
                            N.
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-black mt-6 tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                    Sameer AI
                </h1>

                <p className="text-cyan-400/80 mt-2 text-sm uppercase tracking-widest font-mono">
                    Your Personal AI Assistant
                </p>

                <p className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed">
                    I can help you manage Gmail, Google Calendar, Google Tasks,
                    Google Docs, expenses, weather, web search and much more.
                </p>

            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8">

            <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">

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
                            className={`flex items-end gap-2 md:gap-3 max-w-[92%] md:max-w-[80%] ${
                                msg.role === "user"
                                    ? "flex-row-reverse"
                                    : ""
                            }`}
                        >

                            {/* Avatar */}

                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 border ${
                                    msg.role === "user"
                                        ? "bg-gradient-to-tr from-cyan-500 to-blue-600 border-cyan-400/30 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                        : "bg-[#0b1329] border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-black italic"
                                }`}
                                style={msg.role !== "user" ? { fontFamily: "'Playfair Display', serif" } : undefined}
                            >
                                {msg.role === "user" ? "👤" : "N."}
                            </div>


                            {/* Bubble */}

                            <div
                                className={`rounded-2xl px-5 py-4 shadow-xl whitespace-pre-wrap break-words ${
                                    msg.role === "user"
                                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white border border-cyan-400/30 rounded-br-md shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                                        : "bg-[#080d1a]/90 backdrop-blur-md border border-cyan-500/20 text-slate-100 rounded-bl-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
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