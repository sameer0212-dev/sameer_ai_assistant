"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { FaMicrophone, FaPaperPlane, FaBolt } from "react-icons/fa";

interface ChatInputProps {
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ChatInput({
    messages,
    setMessages,
}: ChatInputProps) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);
    const [voiceMode, setVoiceMode] = useState(false);

    function startListening() {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;

            setVoiceMode(true);      // remember this message came from voice
            setMessage(transcript);
        };

        recognition.start();
    }

    // Helper to format structured responses if non-streamed/JSON output arrives
    function formatToolResponse(result: any): string {
        let content = "";

        // Normal Chat
        if (result.output) {
            content = result.output;
        }
        // Tool Responses
        else if (result.message) {
            content = `✅ ${String(result.message).replace(/"/g, "")}`;

            if (result.title) {
                content += `\n\n📌 Title: ${result.title}`;
            }
            if (result.recipient) {
                content += `\n📧 To: ${result.recipient}`;
            }
            if (result.subject) {
                content += `\n📝 Subject: ${result.subject}`;
            }
            if (result.body) {
                content += `\n\n${result.body}`;
            }
            if (result.start) {
                content += `\n🕒 Start: ${result.start}`;
            }
            if (result.end) {
                content += `\n🕓 End: ${result.end}`;
            }
            if (result.status) {
                content += `\n📍 Status: ${result.status}`;
            }
            if (result.location) {
                content += `\n📍 Location: ${result.location}`;
            }
            if (result.description) {
                content += `\n📝 Description: ${result.description}`;
            }
            if (result.link) {
                content += `\n\n🔗 ${result.link}`;
            }
        }
        // Unknown Response
        else {
            content = JSON.stringify(result, null, 2);
        }

        return content;
    }

    async function sendMessage() {
        if (!message.trim() || loading) return;

        const currentMessage = message;
        setMessage("");
        setLoading(true);

        // 1. Instantly append user message & empty assistant placeholder
        setMessages((prev) => [
            ...prev,
            { role: "user", content: currentMessage },
            { role: "assistant", content: "" },
        ]);

        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            // 2. Fetch stream using native API
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: currentMessage,
                    provider_token: session?.provider_token,
                }),
            });

            if (!response.body) {
                throw new Error("No response body received.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let accumulatedContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedContent += chunk;

                // Update the assistant message in real-time
                setMessages((prev) => {
                    const updated = [...prev];
                    const lastIndex = updated.length - 1;

                    // If stream returned raw JSON string, attempt tool formatting
                    let displayContent = accumulatedContent;
                    if (accumulatedContent.trim().startsWith("{") || accumulatedContent.trim().startsWith("[")) {
                        try {
                            const parsed = JSON.parse(accumulatedContent);
                            const result = Array.isArray(parsed) ? parsed[0] : parsed;
                            displayContent = formatToolResponse(result);
                        } catch {
                            // Incomplete JSON string while streaming; fallback to raw chunk output
                        }
                    }

                    updated[lastIndex] = {
                        ...updated[lastIndex],
                        content: displayContent,
                    };
                    return updated;
                });
            }

            // 🔊 Speak response if voiceMode was active
            if (voiceMode && accumulatedContent.trim()) {
                const utterance = new SpeechSynthesisUtterance(accumulatedContent);
                utterance.rate = 1;
                utterance.pitch = 1;
                utterance.lang = "en-US";

                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);

                // reset for the next message
                setVoiceMode(false);
            }

        } catch (error) {
            console.error("Chat Error:", error);

            setMessages((prev) => {
                const updated = [...prev];
                const lastIndex = updated.length - 1;
                updated[lastIndex] = {
                    role: "assistant",
                    content: "❌ Failed to contact AI.",
                };
                return updated;
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 max-w-5xl w-full mx-auto border-t border-cyan-500/10 bg-[#030712]/40 backdrop-blur-md">
            <div className="relative flex items-center rounded-2xl bg-[#090f1f]/80 backdrop-blur-xl border border-cyan-500/30 p-2 shadow-[0_0_30px_rgba(6,182,212,0.15)] focus-within:border-cyan-400 transition-all gap-2">

                <FaBolt className="text-cyan-400 ml-3 animate-pulse text-xs shrink-0" />

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    placeholder="Ask Sameer AI or enter a command..."
                    className="flex-1 bg-transparent px-3 py-2 text-slate-100 placeholder-slate-500 outline-none text-sm"
                />

                <button
                    onClick={startListening}
                    className={`p-3 rounded-xl text-white transition-all shrink-0 ${listening
                        ? "bg-rose-600 animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.5)]"
                        : "bg-slate-800/80 hover:bg-slate-700 text-cyan-400"
                        }`}
                >
                    <FaMicrophone className="text-xs" />
                </button>

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white font-medium text-xs shadow-lg shadow-cyan-500/20 transition-all shrink-0 flex items-center gap-2"
                >
                    {loading ? (
                        <span className="animate-pulse">...</span>
                    ) : (
                        <>
                            <span>Send</span>
                            <FaPaperPlane className="text-[10px]" />
                        </>
                    )}
                </button>
            </div>
            <div className="flex justify-between items-center px-4 pt-2 text-[10px] text-slate-500 font-mono">
                <span>PROMPT ENCRYPTION: ACTIVE</span>
                <span>VOICE RECOGNITION READY</span>
            </div>
        </div>
    );
}