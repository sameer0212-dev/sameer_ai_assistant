"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);

    const [loadingScreen, setLoadingScreen] = useState(true);

    const [messages, setMessages] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        async function loadUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/");
                return;
            }

            setUser(user);
            setTimeout(() => {
                setLoadingScreen(false);
            }, 2200);
        }

        loadUser();
    }, [router]);

    async function logout() {
        await supabase.auth.signOut();
        router.push("/");
    }

    if (loadingScreen) {
        return <LoadingScreen />;
    }

    if (!user) return null;

    return (
        <div className="relative min-h-dvh w-full bg-[#030712] overflow-hidden">
            {/* ================= JARVIS / GEMINI HYBRID AMBIENT BACKDROP ================= */}
            
            {/* Top Cyan Glowing Halo */}
            <div className="pointer-events-none fixed top-[-20%] left-[20%] w-[800px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full z-0" />
            
            {/* Center Indigo Ambient Aura */}
            <div className="pointer-events-none fixed top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-600/10 blur-[200px] rounded-full z-0" />
            
            {/* Subtle Futuristic HUD Grid Lines Overlay */}
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#1f29370d_1px,transparent_1px),linear-gradient(to_bottom,#1f29370d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] z-0" />

            {/* Main Application Container */}
            <div className="relative z-10 flex h-dvh w-full">
                <AppLayout>
                    <Sidebar />

                    <div
                        className="
                            flex-1
                            flex
                            flex-col
                            relative
                            z-10
                            bg-[#030712]/60
                            backdrop-blur-md
                            animate-[fadeIn_.8s_ease]
                        "
                    >
                        <Navbar
                            name={user.user_metadata?.full_name}
                            logout={logout}
                        />

                        <ChatWindow messages={messages} />

                        <ChatInput
                            messages={messages}
                            setMessages={setMessages}
                        />
                    </div>
                </AppLayout>
            </div>
        </div>
    );
}