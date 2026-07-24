"use client";

import { FaPlus, FaComments } from "react-icons/fa";

export default function Sidebar() {
    return (
        <aside
            className="
                hidden
                md:flex
                w-72
                bg-[#080d1a]/80
                backdrop-blur-xl
                border-r
                border-cyan-500/10
                flex-col
                animate-[slideLeft_.6s_ease]
                select-none
                relative
                z-20
            "
        >
            {/* Header / Brand Badge */}
            <div className="p-5 pb-2 flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <div className="w-full h-full bg-[#060b18] rounded-[11px] flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                </div>
                <div>
                    <h1 className="font-bold text-base tracking-wide bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                        SAMEER AI
                    </h1>
                    <span className="text-[10px] uppercase tracking-widest text-cyan-400/70 font-mono block">
                        • Active
                    </span>
                </div>
            </div>

            {/* New Chat Button */}
            <div className="p-5">
                <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-90 active:scale-[0.98] rounded-xl py-3 flex items-center justify-center gap-2 text-white font-medium shadow-lg shadow-cyan-500/20 border border-cyan-300/30 transition-all">
                    <FaPlus className="text-xs" />
                    <span>New Chat</span>
                </button>
            </div>

            {/* Recent Chats Header */}
            <div className="px-5 text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">
                Recent Chats
            </div>

            {/* Recent Items List */}
            <div className="flex-1 mt-3 space-y-2 px-3 overflow-y-auto">
                <button className="w-full flex items-center gap-3 rounded-xl px-3 py-3 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
                    <FaComments className="text-cyan-400" />
                    <span className="text-sm font-medium truncate">AI Conversation</span>
                </button>
            </div>

            {/* Bottom Holographic Badge ("N.") */}
            <div className="p-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        <span
                            style={{ fontFamily: "'Playfair Display', serif" }}
                            className="text-xs font-black italic text-cyan-300"
                        >
                            N.
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-300">System Ready</span>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Online
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}