"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

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
    }

    loadUser();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (!user) return null;

  return (
    <AppLayout>
      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar
          name={user.user_metadata.full_name}
          logout={logout}
        />

        <ChatWindow messages={messages} />

        <ChatInput
          messages={messages}
          setMessages={setMessages}
        />

      </div>
    </AppLayout>
  );
}