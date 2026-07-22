"use client";

import { useState } from "react";
import axios from "axios";
import { supabase } from "@/lib/supabase";
import { FaMicrophone } from "react-icons/fa";

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

    async function sendMessage() {
        if (!message.trim()) return;

        const userMessage = {
            role: "user",
            content: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentMessage = message;
        setMessage("");

        setLoading(true);

        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            const response = await axios.post(
                "http://127.0.0.1:8000/chat",
                {
                    message: currentMessage,
                    provider_token: session?.provider_token,
                }
            );

            console.log("Response:", response);
            console.log("Data:", response.data);

            // Works whether FastAPI returns an array or an object
            const result = Array.isArray(response.data)
                ? response.data[0]
                : response.data;

            let content = "";

            // ===========================
            // Normal Chat
            // ===========================
            if (result.output) {
                content = result.output;
            }

            // ===========================
            // Tool Responses
            // ===========================
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

            // ===========================
            // Unknown Response
            // ===========================
            else {
                content = JSON.stringify(result, null, 2);
            }

            const aiMessage = {
                role: "assistant",
                content,
            };

            setMessages((prev) => [...prev, aiMessage]);

            // 🔊 Speak the AI response
            const utterance = new SpeechSynthesisUtterance(content);

            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.lang = "en-US";

            if (voiceMode) {
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);

                // reset for the next message
                setVoiceMode(false);
            }

        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "❌ Failed to contact AI.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border-t border-gray-800 p-5">
            <div className="flex gap-3">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    className="flex-1 bg-gray-900 rounded-xl px-5 py-4 outline-none"
                    placeholder="Type your message..."
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="bg-blue-600 px-6 rounded-xl hover:bg-blue-700 disabled:bg-gray-700"
                >
                    {loading ? "..." : "Send"}
                </button>

                <button
                    onClick={startListening}
                    className={`px-5 rounded-xl text-white transition ${listening
                        ? "bg-red-600 animate-pulse"
                        : "bg-gray-800 hover:bg-gray-700"
                        }`}
                >
                    <FaMicrophone />
                </button>
            </div>
        </div>
    );
}