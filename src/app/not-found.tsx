import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Sparkles, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center flex flex-col items-center justify-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-6 shadow-vercel-sm">
            <span className="font-bold">404 ERROR</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            <span>PAGE NOT FOUND</span>
          </div>

          {/* Headline per DESIGN.md (Sentence Case, Period Terminated) */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 mb-4 text-balance">
            404 — Page not found.
          </h1>

          <p className="text-zinc-600 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist, has been removed, or was moved to another URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs shadow-vercel-sm hover:scale-105 transition-all min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Back to Studio</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-xs border border-zinc-200 transition-all min-h-[44px]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
