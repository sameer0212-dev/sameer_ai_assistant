"use client";

import { FaUser, FaSignOutAlt, FaRobot } from "react-icons/fa";

interface Props {
  name: string;
  logout: () => void;
}

export default function Navbar({ name, logout }: Props) {
  return (
    <header className="w-full h-16 border-b border-cyan-500/10 bg-[#080d1a]/40 backdrop-blur-md flex justify-between items-center px-4 md:px-8 z-10 shrink-0">
      
      {/* Brand Badge */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <div className="w-full h-full bg-[#060b18] rounded-[11px] flex items-center justify-center">
            <FaRobot className="text-cyan-400 text-sm animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            Sameer AI
          </h1>
        </div>
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
          <FaUser className="text-cyan-400 text-xs" />
          <span className="hidden sm:inline text-xs font-medium text-slate-200">
            {name || "Sameer WD"}
          </span>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium hover:bg-rose-500/20 transition-all active:scale-95"
        >
          <FaSignOutAlt className="text-xs" />
          <span className="hidden sm:inline">
            Logout
          </span>
        </button>
      </div>
      
    </header>
  );
}