"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="h-dvh w-full bg-[#030712] text-slate-100 flex flex-col md:flex-row overflow-hidden font-sans select-none relative">
      {children}
    </div>
  );
}