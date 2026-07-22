"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {children}
    </div>
  );
}