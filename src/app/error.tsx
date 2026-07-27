'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center flex flex-col items-center justify-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-6 shadow-vercel-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-zinc-950" />
            <span className="font-bold">500 ERROR</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            <span>UNEXPECTED ISSUE</span>
          </div>

          {/* Headline per DESIGN.md (Sentence Case, Period Terminated) */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 mb-4 text-balance">
            500 — Something went wrong.
          </h1>

          <p className="text-zinc-600 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            An unexpected application error occurred during rendering. Don&apos;t worry, your original files are safe.
          </p>

          {/* Error Digest Info if available */}
          {error.digest && (
            <div className="mb-6 px-3 py-1.5 rounded-md bg-zinc-100 border border-zinc-200 text-[11px] font-mono-tech text-zinc-500">
              Error Digest: {error.digest}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs shadow-vercel-sm hover:scale-105 transition-all min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-xs border border-zinc-200 transition-all min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Return to Studio</span>
            </Link>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
