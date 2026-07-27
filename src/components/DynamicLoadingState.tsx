'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

const FUNNY_LOADING_MESSAGES = [
  '✂️ Asking AI nicely to erase the background...',
  '🔬 Inspecting every single pixel with microscopic precision...',
  '🐱 Polishing hair strands, fur, and fine edges...',
  '🧠 Teaching neural networks to isolate photobombers...',
  '🚀 Running 100% on your GPU (0 bytes sent to cloud)...',
  '🎨 Painting invisible alpha transparency channels...',
  '⚡ Bending photons inside your WebAssembly runtime...',
  '🔮 Extracting subjects with pure in-browser AI magic...',
  '🛡️ Guarding your privacy — zero remote servers allowed...',
  '✨ Almost there! Prepping your full-resolution 4K HD cutout...',
];

interface DynamicLoadingStateProps {
  loadingStep: string;
}

export const DynamicLoadingState: React.FC<DynamicLoadingStateProps> = ({ loadingStep }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Cycle text comfortably every 4.5 seconds so user can read naturally
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % FUNNY_LOADING_MESSAGES.length);
        setFade(true);
      }, 300);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center select-none">
      
      {/* Vercel Style Dual Spinning Rings */}
      <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-zinc-200 border-t-zinc-950 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-zinc-300 border-b-zinc-800 animate-spin" style={{ animationDirection: 'reverse' }} />
        <Sparkles className="w-8 h-8 text-zinc-950 animate-pulse" />
      </div>

      {/* Primary Technical Headline */}
      <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 mb-3 tracking-tight">
        {loadingStep || 'Removing background in WASM AI...'}
      </h2>

      {/* Dynamic Funny Short Text (Smooth 4.5s Cycle with Fading) */}
      <div className="h-8 flex items-center justify-center mb-6">
        <p
          className={`text-xs sm:text-sm font-mono-tech text-zinc-600 transition-all duration-300 ${
            fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {FUNNY_LOADING_MESSAGES[msgIndex]}
        </p>
      </div>

      {/* Privacy Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech shadow-vercel-sm">
        <ShieldCheck className="w-4 h-4 text-zinc-950" />
        <span>0 bytes sent to server • 100% On-Device</span>
      </div>

    </div>
  );
};
