'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white text-zinc-600 text-xs py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          {/* Brand & Mission */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <Link href="/" className="w-8 h-8 rounded-md overflow-hidden bg-zinc-950 flex items-center justify-center shadow-vercel-sm shrink-0">
              <img src="/logo.webp" alt="BG Remover Logo" className="w-full h-full object-cover" />
            </Link>
            <div>
              <div className="font-semibold text-zinc-950">BG Remover</div>
              <div className="text-[11px] text-zinc-500">100% Client-side AI Background Removal Studio</div>
            </div>
          </div>

          {/* Essential Page Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium text-xs text-zinc-600">
            <Link href="/about" className="hover:text-zinc-950 transition-colors">
              About Us
            </Link>
            <Link href="/privacy" className="hover:text-zinc-950 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-950 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-zinc-950 transition-colors">
              Contact Us
            </Link>
          </nav>

        </div>

        {/* Copyright Row */}
        <div className="pt-4 border-t border-zinc-100 text-center sm:text-left text-[11px] text-zinc-500">
          © {new Date().getFullYear()} BG Remover. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
