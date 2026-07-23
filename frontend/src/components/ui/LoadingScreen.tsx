"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 overflow-hidden bg-[#030712] flex items-center justify-center font-sans z-50">

            {/* ================= BACKGROUND HUD & AMBIENT GLOWS ================= */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.25, 0.45, 0.25],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                }}
                className="
                    absolute
                    w-[1200px]
                    h-[500px]
                    rounded-full
                    bg-cyan-500/20
                    blur-[170px]
                    pointer-events-none
                "
            />
            
            {/* HUD Grid Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370d_1px,transparent_1px),linear-gradient(to_bottom,#1f29370d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

            {/* Simulated Dashboard Frame Background */}
            <div className="absolute inset-4 rounded-2xl border border-cyan-500/10 bg-[#060b18]/40 backdrop-blur-md pointer-events-none flex flex-col justify-between p-6 opacity-40">
                {/* Fake Header Bar */}
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
                            <span className="text-cyan-400 text-xs italic font-serif">N.</span>
                        </div>
                        <div className="h-3 w-28 bg-slate-700/50 rounded animate-pulse" />
                    </div>
                    <div className="flex gap-2">
                        <div className="h-8 w-20 bg-slate-800/60 rounded-lg border border-cyan-500/20" />
                        <div className="h-8 w-20 bg-rose-950/40 rounded-lg border border-rose-500/20" />
                    </div>
                </div>

                {/* Fake Bottom Input Bar */}
                <div className="h-12 w-full max-w-4xl mx-auto rounded-xl border border-cyan-500/20 bg-[#080f23]/60 flex items-center justify-between px-4">
                    <div className="h-3 w-48 bg-slate-700/40 rounded" />
                    <div className="h-7 w-16 bg-cyan-500/20 rounded-lg border border-cyan-400/30" />
                </div>
            </div>

            {/* Orbiting Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8 + i,
                        ease: "linear",
                    }}
                    className="absolute"
                    style={{
                        width: 260,
                        height: 260,
                    }}
                >
                    <div
                        style={{
                            transform: `rotate(${i * 45}deg) translateY(-130px)`,
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            w-2
                            h-2
                            rounded-full
                            bg-cyan-300
                            shadow-[0_0_20px_#67e8f9]
                        "
                    />
                </motion.div>
            ))}

            {/* Rotating Orb Outer Rings */}
            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "linear",
                }}
                className="relative w-44 h-44 flex items-center justify-center"
            >
                {/* Outer Ring */}
                <motion.div
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "linear",
                    }}
                    className="
                        absolute
                        inset-0
                        rounded-full
                        border-2
                        border-cyan-400/40
                        shadow-[0_0_30px_rgba(6,182,212,0.2)]
                    "
                />

                {/* Inner Orb */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                    }}
                    className="
                        absolute
                        inset-5
                        rounded-full
                        bg-gradient-to-br
                        from-cyan-400/80
                        via-blue-600/90
                        to-indigo-900
                        shadow-[0_0_80px_#2563eb]
                        border border-cyan-300/30
                    "
                >
                    {/* Reflection */}
                    <div
                        className="
                            absolute
                            top-5
                            left-6
                            w-10
                            h-10
                            rounded-full
                            bg-white/40
                            blur-md
                        "
                    />
                </motion.div>
            </motion.div>

            {/* Fixed Center Logo */}
            <motion.div
                animate={{
                    opacity: [0.9, 1, 0.9],
                    scale: [1, 1.04, 1],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    w-44
                    h-44
                    flex
                    items-center
                    justify-center
                    pointer-events-none
                    select-none
                "
            >
                <div className="relative flex items-center justify-center">
                    {/* Subtle Holographic Prism Halo */}
                    <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400/30 via-sky-300/20 to-blue-500/30 blur-md animate-pulse" />
                    
                    <span
                        style={{
                            fontFamily: "'Playfair Display', 'Didot', 'Bodoni MT', 'Cinzel', serif",
                            background:
                                "linear-gradient(180deg, #ffffff 10%, #e0f2fe 50%, #7dd3fc 85%, #38bdf8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(56, 189, 248, 0.6))",
                        }}
                        className="
                            relative
                            text-7xl
                            font-extralight
                            italic
                            tracking-wider
                            pr-1
                        "
                    >
                        N.
                    </span>
                </div>
            </motion.div>

            {/* Fixed Title */}
            <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="
                    absolute
                    mt-[340px]
                    text-4xl
                    md:text-5xl
                    font-black
                    tracking-[0.2em]
                    uppercase
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-white
                    via-slate-100
                    to-cyan-300
                    drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]
                "
            >
                SAMEER AI
            </motion.h1>

            {/* Fixed Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                }}
                className="
                    absolute
                    mt-[410px]
                    text-cyan-400
                    font-mono
                    text-xs
                    font-semibold
                    tracking-[0.35em]
                "
            >
                INITIALIZING ...
            </motion.p>

        </div>
    );
}