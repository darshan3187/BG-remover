import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles, ShieldCheck, Zap, HeartHandshake, Code, UserCheck } from 'lucide-react';
import { generateSEO } from '@/lib/seo/metadata';

export const metadata: Metadata = generateSEO({
  title: 'About Us — Democratizing AI Background Removal',
  description: 'Learn about BG Remover’s mission to provide 100% private, client-side WebAssembly AI background removal with zero subscription paywalls or credit limits.',
  path: '/about',
});

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
            BG Remover was architected and built by <strong>Rajgor Darshan</strong> to democratize high-precision image background removal using modern in-browser WebAssembly AI—eliminating monthly subscriptions, credit paywalls, and privacy risks.
          </p>

          <div className="space-y-8 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-vercel-sm">
                <ShieldCheck className="w-6 h-6 text-zinc-950 mb-3" />
                <h3 className="text-base font-bold text-zinc-950 mb-1">100% Private</h3>
                <p className="text-zinc-600">
                  Default WebAssembly engine runs 100% locally inside your browser memory sandbox.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-vercel-sm">
                <Zap className="w-6 h-6 text-zinc-950 mb-3" />
                <h3 className="text-base font-bold text-zinc-950 mb-1">Sub-Second Speed</h3>
                <p className="text-zinc-600">
                  Powered by GPU acceleration and pre-warmed ISNet neural segmentation models.
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

            {/* Builder / Creator Info Card */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold text-xl font-mono-tech shadow-vercel-sm shrink-0">
                  RD
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-zinc-950">Rajgor Darshan</h3>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-[10px] font-mono-tech text-zinc-900 font-semibold flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-zinc-950" /> Builder & Lead Architect
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1">
                    Software Architect & Web Performance Engineer passionate about local browser AI, computer vision, and high-performance web applications.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Story */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <h2 className="text-xl font-bold text-zinc-950 mb-4">Why BG Remover Was Created</h2>
              <p className="mb-4">
                As designers, e-commerce store owners, and software engineers, we were tired of legacy background removal websites that trap users into monthly subscriptions just to download a high-resolution PNG image. Furthermore, uploading private customer photos or confidential corporate product teasers to unknown cloud servers created unacceptable privacy risks.
              </p>
              <p>
                By leveraging modern WebAssembly (WASM) and ONNX machine learning standards, we moved the neural network inference pipeline directly onto the user&apos;s client device. The result is a fast, private background remover that costs nothing to use.
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
