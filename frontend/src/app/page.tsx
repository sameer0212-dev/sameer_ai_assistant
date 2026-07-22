"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("SESSION:", session);
      console.log("Provider Token:", session?.provider_token);
      console.log("Refresh Token:", session?.provider_refresh_token);
      console.log(session);

      if (session) {
        router.push("/dashboard");
      }

    }

    checkSession();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    location.reload();
  }

  if (user) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-xl">

          <h1 className="text-3xl font-bold">
            Welcome 👋
          </h1>

          <p className="mt-4">
            {user.user_metadata.full_name}
          </p>

          <p>
            {user.email}
          </p>

          <button
            onClick={logout}
            className="mt-6 bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl">

        <h1 className="text-4xl font-bold mb-4">
          🤖 Sameer AI
        </h1>

        <button
          onClick={signInWithGoogle}
          className="bg-white text-black px-6 py-3 rounded-lg"
        >
          Continue with Google
        </button>

      </div>
    </main>
  );
}