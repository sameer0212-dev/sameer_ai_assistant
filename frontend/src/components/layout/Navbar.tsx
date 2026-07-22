"use client";

interface Props {
  name: string;
  logout: () => void;
}

export default function Navbar({ name, logout }: Props) {
  return (
    <div className="h-16 border-b border-gray-800 flex justify-between items-center px-8">

      <h1 className="text-2xl font-bold">
        🤖 Sameer AI
      </h1>

      <div className="flex items-center gap-5">

        <span>
          👤 {name}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}