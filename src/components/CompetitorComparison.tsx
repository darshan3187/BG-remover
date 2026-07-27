'use client';

import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export const CompetitorComparison: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-10 sm:py-16 border-t border-zinc-200/80">
      
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4 shadow-vercel-sm">
          <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
          <span>SUPERIORITY MATRIX</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight mb-3 sm:mb-4">
          Why BG Remover outperforms competitors.
        </h2>
        <p className="text-zinc-600 text-xs sm:text-base text-pretty max-w-xl mx-auto">
          We analyzed Remove.bg, PhotoRoom, Pixelcut, and Removal.ai. Here is why our client-side AI engine gives you complete privacy, speed, and unlimited freedom.
        </p>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="block sm:hidden text-center text-[10px] font-mono-tech text-zinc-500 mb-2">
        Swipe table horizontally to compare →
      </div>

      {/* Comparison Table with Mobile Scroll Container */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-vercel-md -mx-1 sm:mx-0">
        <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-[auto]">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-100/90">
              <th className="p-3 sm:p-4 text-xs font-mono-tech uppercase tracking-wider text-zinc-600">Feature Comparison</th>
              <th className="p-3 sm:p-4 text-xs font-mono-tech uppercase tracking-wider text-zinc-600">Remove.bg / Removal.ai</th>
              <th className="p-3 sm:p-4 text-xs font-mono-tech uppercase tracking-wider text-zinc-600">PhotoRoom / Pixelcut</th>
              <th className="p-3 sm:p-4 text-xs font-mono-tech uppercase tracking-wider text-zinc-950 font-bold bg-zinc-100 border-l border-r border-zinc-300">
                ⚡ BG Remover (Us)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/80 text-[11px] sm:text-xs text-zinc-700">

            <tr>
              <td className="p-3 sm:p-4 font-semibold text-zinc-950">Full HD / 4K Resolution Export</td>
              <td className="p-3 sm:p-4 text-zinc-600">Paywall / 1 Free Credit Only</td>
              <td className="p-3 sm:p-4 text-zinc-600">Low-res previews unless Pro plan</td>
              <td className="p-3 sm:p-4 text-zinc-950 font-semibold bg-zinc-50/80 border-l border-r border-zinc-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-zinc-950 stroke-[3] shrink-0" /> Unlimited Free HD Exports
              </td>
            </tr>

            <tr>
              <td className="p-3 sm:p-4 font-semibold text-zinc-950">Processing Latency</td>
              <td className="p-3 sm:p-4 text-zinc-500 font-mono-tech">2.5s - 5s (Network Dependent)</td>
              <td className="p-3 sm:p-4 text-zinc-500 font-mono-tech">2s - 4s (Queue Dependent)</td>
              <td className="p-3 sm:p-4 text-zinc-950 font-semibold bg-zinc-50/80 border-l border-r border-zinc-300 flex items-center gap-1.5 font-mono-tech">
                <Check className="w-4 h-4 text-zinc-950 stroke-[3] shrink-0" /> Instant WASM (~85ms)
              </td>
            </tr>

            <tr>
              <td className="p-3 sm:p-4 font-semibold text-zinc-950">Background Studio Editor</td>
              <td className="p-3 sm:p-4 text-zinc-500">Basic solid color swap</td>
              <td className="p-3 sm:p-4 text-zinc-500">Watermarks on free editor</td>
              <td className="p-3 sm:p-4 text-zinc-950 font-semibold bg-zinc-50/80 border-l border-r border-zinc-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-zinc-950 stroke-[3] shrink-0" /> Pro Studio (Shadows, Glow, Bokeh, Stock)
              </td>
            </tr>

            <tr>
              <td className="p-3 sm:p-4 font-semibold text-zinc-950">Bulk / Batch Processing</td>
              <td className="p-3 sm:p-4 text-zinc-500">Paid API only</td>
              <td className="p-3 sm:p-4 text-zinc-500">Paid Pro tier only</td>
              <td className="p-3 sm:p-4 text-zinc-950 font-semibold bg-zinc-50/80 border-l border-r border-zinc-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-zinc-950 stroke-[3] shrink-0" /> Included Free + ZIP Export
              </td>
            </tr>

            <tr>
              <td className="p-3 sm:p-4 font-semibold text-zinc-950">Vector SVG Outline Trace</td>
              <td className="p-3 sm:p-4 text-zinc-500"><X className="w-4 h-4 text-zinc-400 shrink-0" /> Not Available</td>
              <td className="p-3 sm:p-4 text-zinc-500"><X className="w-4 h-4 text-zinc-400 shrink-0" /> Not Available</td>
              <td className="p-3 sm:p-4 text-zinc-950 font-semibold bg-zinc-50/80 border-l border-r border-zinc-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-zinc-950 stroke-[3] shrink-0" /> SVG Vector Silhouette Output
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </section>
  );
};
