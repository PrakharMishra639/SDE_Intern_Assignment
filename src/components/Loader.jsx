import React from "react";
import { Skeleton } from "../components/ui/skeleton";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-5xl relative overflow-hidden rounded-3xl border border-[#F67B6D]/30 shadow-sm">
        <div className="h-[400px] bg-[#FFF4F3]" />

        <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#F67B6D]/10 to-transparent animate-shimmer" />
      </div>

      <p className="mt-6 text-lg font-medium text-[#333444] tracking-wide text-center">
        {text}
      </p>

      <div className="w-32 h-3 mt-4 rounded-full bg-[#F67B6D]/20 animate-pulse" />
    </div>
  );
}
