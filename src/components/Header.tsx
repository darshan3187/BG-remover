'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Command, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab?: 'single' | 'batch';
  setActiveTab?: (tab: 'single' | 'batch') => void;
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab = 'single', 
  setActiveTab, 
  onReset 
}) => {
  const handleLogoClick = () => {
    if (onReset) onReset();
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 border-b border-zinc-200/80 transition-all shadow-vercel-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <Link 
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          aria-label="BG Remover Home"
        >
          {/* Custom WebP Logo */}
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-zinc-950 flex items-center justify-center shadow-vercel-sm group-hover:scale-105 transition-transform">
            <img 
              src="/logo.webp" 
              alt="BG Remover WebP Logo" 
              width={36}
              height={36}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors">
              BG Remover
            </span>
          </div>
        </Link>

        {/* Tab Switcher */}
        <nav className="flex items-center p-1 bg-zinc-100/90 border border-zinc-200/80 rounded-full shadow-vercel-sm" aria-label="Studio Mode Options">
          {setActiveTab ? (
            <>
              <button
                onClick={() => setActiveTab('single')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'single'
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950'
                } focus-visible:ring-2 focus-visible:ring-zinc-950/50 outline-none min-h-[36px] sm:min-h-[auto]`}
                aria-label="Switch to Studio Mode"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Studio</span>
              </button>
              
              <button
                onClick={() => setActiveTab('batch')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'batch'
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950'
                } focus-visible:ring-2 focus-visible:ring-zinc-950/50 outline-none min-h-[36px] sm:min-h-[auto]`}
                aria-label="Switch to Batch Mode"
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Batch</span>
                <span className="px-1 py-0.2 text-[9px] font-mono-tech rounded bg-zinc-200 text-zinc-900 border border-zinc-300 hidden sm:inline-block">
                  BULK
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-950 text-white text-xs font-medium shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to Studio</span>
            </Link>
          )}
        </nav>

        {/* Right Badges */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono-tech">
            <Command className="w-3 h-3 text-zinc-500" aria-hidden="true" />
            <span>+ V paste</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 text-white border border-zinc-950 text-xs font-medium shadow-vercel-sm">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>100% Private</span>
          </div>
        </div>

      </div>
    </header>
  );
};
