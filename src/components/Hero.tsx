'use client';

import React from 'react';
import { ShieldCheck, Zap, Sparkles, Image as ImageIcon } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-8 sm:pt-12 pb-6 sm:pb-8 text-center max-w-4xl mx-auto px-4 overflow-hidden">
      
      {/* Eyebrow Mono Badge */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/90 text-zinc-900 text-[11px] sm:text-xs font-mono-tech mb-4 sm:mb-6 shadow-vercel-sm max-w-full">
        <Sparkles className="w-3.5 h-3.5 text-zinc-950 shrink-0 animate-pulse" aria-hidden="true" />
        <span className="truncate">NEXT-GEN CLIENT-SIDE AI ENGINE</span>
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 shrink-0 animate-ping" />
      </div>

      {/* Main Title - Responsive Sizing */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-4 sm:mb-6 text-wrap-balance leading-tight sm:leading-tight">
        Remove image backgrounds <br className="hidden sm:inline" />
        <span className="text-gradient-monochrome">in 100% private, instant AI.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-600 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 font-normal leading-relaxed text-pretty">
        No server uploads. No credit limits. Download unlimited full-resolution HD PNGs for free without watermarks or paywalls.
      </p>

      {/* Stats & Features Pill Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-2xl mx-auto mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/90 shadow-vercel-sm backdrop-blur-sm">
          <Zap className="w-4 h-4 text-zinc-900 shrink-0" aria-hidden="true" />
          <div className="text-left">
            <div className="text-xs font-semibold text-zinc-950">GPU & WASM Speed</div>
            <div className="text-[11px] text-zinc-500 font-mono-tech">⚡ ~85ms average</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/90 shadow-vercel-sm backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0" aria-hidden="true" />
          <div className="text-left">
            <div className="text-xs font-semibold text-zinc-950">Zero Server Upload</div>
            <div className="text-[11px] text-zinc-500 font-mono-tech">100% Private On-Device</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/90 shadow-vercel-sm backdrop-blur-sm">
          <ImageIcon className="w-4 h-4 text-zinc-900 shrink-0" aria-hidden="true" />
          <div className="text-left">
            <div className="text-xs font-semibold text-zinc-950">Full HD Exports</div>
            <div className="text-[11px] text-zinc-500 font-mono-tech">Unlimited 4K Resolution</div>
          </div>
        </div>
      </div>

    </div>
  );
};
