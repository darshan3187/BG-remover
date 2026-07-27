import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Democratizing AI Background Removal',
  description: 'Learn about BG Remover’s mission to provide 100% private, client-side WebAssembly AI background removal with zero subscription paywalls or credit limits.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-6 shadow-vercel-sm">
            <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
            <span>OUR MISSION & STORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-6">
            About BG Remover.
          </h1>

          <p className="text-zinc-600 text-base sm:text-xl leading-relaxed mb-10 max-w-3xl">
            We built BG Remover because commercial background removal tools became cluttered with credit limits, mandatory account signups, low-res preview paywalls, and privacy risks.
          </p>

          <div className="space-y-8 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            
            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-vercel-sm">
                <ShieldCheck className="w-6 h-6 text-zinc-950 mb-3" />
                <h3 className="text-base font-bold text-zinc-950 mb-1">100% Private</h3>
                <p className="text-zinc-600">
                  Zero cloud uploads. All AI models run locally inside your browser WebAssembly sandbox.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-vercel-sm">
                <Zap className="w-6 h-6 text-zinc-950 mb-3" />
                <h3 className="text-base font-bold text-zinc-950 mb-1">Sub-Second Speed</h3>
                <p className="text-zinc-600">
                  Powered by GPU acceleration and pre-warmed ISNet neural segmentation models (~85ms average execution).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-vercel-sm">
                <HeartHandshake className="w-6 h-6 text-zinc-950 mb-3" />
                <h3 className="text-base font-bold text-zinc-950 mb-1">Unlimited Free 4K</h3>
                <p className="text-zinc-600">
                  Download full 4K resolution PNGs and SVG vector outlines without subscriptions or watermarks.
                </p>
              </div>
            </div>

            {/* Our Story */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <h2 className="text-xl font-bold text-zinc-950 mb-4">Why We Built BG Remover</h2>
              <p className="mb-4">
                As designers, e-commerce store owners, and software engineers, we were tired of legacy background removal websites that trap users into monthly subscriptions just to download a high-resolution PNG image. Furthermore, uploading private customer photos or confidential corporate product teasers to unknown cloud servers created unacceptable privacy risks.
              </p>
              <p>
                By leveraging modern WebAssembly (WASM) and ONNX machine learning standards, we moved the entire neural network inference pipeline directly onto the user&apos;s client device. The result is a fast, 100% private background remover that works offline and costs nothing to use.
              </p>
            </section>

            {/* Technical Stack */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <h2 className="text-xl font-bold text-zinc-950 mb-4">Our Technology Stack</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-tech">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="font-bold text-zinc-950 mb-1">Next.js 15 & React 19</div>
                  <div className="text-zinc-600">App Router architecture compiled for optimal static site delivery.</div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="font-bold text-zinc-950 mb-1">WASM ONNX & ISNet</div>
                  <div className="text-zinc-600">High-precision floating-point 16-bit neural segmentation weights.</div>
                </div>
              </div>
            </section>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
