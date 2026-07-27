'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fafafa] text-[#171717] flex items-center justify-center p-4 font-sans selection:bg-zinc-950 selection:text-white">
        <div className="max-w-md w-full p-8 rounded-2xl bg-white border border-zinc-200 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-950 flex items-center justify-center mx-auto mb-4 font-mono-tech text-xs font-bold">
            500
          </div>
          <h1 className="text-2xl font-bold text-zinc-950 mb-2">Application Error.</h1>
          <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
            A critical system error occurred. Please refresh or try again.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-full bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-all"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
