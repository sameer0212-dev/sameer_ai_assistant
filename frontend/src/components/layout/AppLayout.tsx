"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="h-screen w-screen bg-[#030712] text-slate-100 flex overflow-hidden font-sans select-none">
      {children}
    </div>
  );
}