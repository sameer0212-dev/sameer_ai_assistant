"use client";

import { FaPlus, FaComments } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-5">
        <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 flex items-center justify-center gap-2">
          <FaPlus />
          New Chat
        </button>
      </div>

      <div className="px-5 text-gray-400 font-semibold">
        Recent Chats
      </div>

      <div className="flex-1 mt-4 space-y-2 px-3">
        <button className="w-full flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-gray-800">
          <FaComments />
          AI Conversation
        </button>
      </div>
    </aside>
  );
}