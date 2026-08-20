import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff, ServerOff, Cpu } from 'lucide-react';
import { generateSEO } from '@/lib/seo/metadata';

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy — Transparent Data Processing Policy',
  description: 'Learn how BG Remover handles image processing. Default client-side WebAssembly AI runs 100% locally in your browser, with optional ephemeral server fallback.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-6 shadow-vercel-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-950" />
            <span>TRANSPARENT IMAGE PROCESSING POLICY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
            Privacy Policy.
          </h1>

          <p className="text-zinc-600 text-sm sm:text-base mb-10 leading-relaxed">
            Last Updated: August 2026
          </p>

          <div className="prose prose-zinc max-w-none space-y-8 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            {/* Section 1: Dual Processing Architecture */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <div className="flex items-center gap-3 mb-4">
                <ServerOff className="w-5 h-5 text-zinc-950" />
                <h2 className="text-xl font-bold text-zinc-950 m-0">1. Client-Side WASM & Server Fallback Architecture</h2>
              </div>
              <p>
                At BG Remover, we believe in full technical transparency. Our application uses a hybrid dual-engine architecture:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600 mt-3">
                <li>
                  <strong>Client-Side WebAssembly (Default / Fallback Engine):</strong> By default, neural network inference runs 100% locally inside your web browser via WebAssembly (WASM) and WebGL. When running in WASM mode, zero image bytes ever leave your local computer.
                </li>
                <li>
                  <strong>Optional Server AI Microservice:</strong> When available, a high-precision server AI endpoint (utilizing SOTA segmentation models like BiRefNet) may be invoked to handle ultra-complex image cutouts.
                </li>
              </ul>
            </section>

            {/* Section 2: Ephemeral Server Memory Policy */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <div className="flex items-center gap-3 mb-4">
                <EyeOff className="w-5 h-5 text-zinc-950" />
                <h2 className="text-xl font-bold text-zinc-950 m-0">2. Zero Persistent Image Storage & No AI Training</h2>
              </div>
              <p>
                Whether processed via client-side WebAssembly or the optional server API:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 mt-2">
                <li><strong>No Permanent Storage:</strong> Images sent to the optional server microservice are processed strictly in ephemeral RAM and immediately discarded upon completion.</li>
                <li><strong>No File Logging:</strong> We do not log original photo uploads, output cutout files, or facial features to disk.</li>
                <li><strong>No AI Model Training:</strong> We do NOT use your uploaded photos to train or fine-tune public AI models.</li>
                <li><strong>No Third-Party Data Sales:</strong> Your images and personal visual assets are never sold, shared, or distributed.</li>
              </ul>
            </section>

            {/* Section 3: Cookies & Analytics */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-zinc-950" />
                <h2 className="text-xl font-bold text-zinc-950 m-0">3. Local Browser Storage & Analytics</h2>
              </div>
              <p>
                We do not use invasive cross-site tracking cookies. We utilize standard browser local storage solely to save user interface preferences (such as aspect ratio crop defaults or studio background selections). Anonymous pageview analytics are collected via Privacy-Friendly Vercel Analytics.
              </p>
            </section>

            {/* Section 4: Contact & Inquiries */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-5 h-5 text-zinc-950" />
                <h2 className="text-xl font-bold text-zinc-950 m-0">4. Privacy Contact & Inquiries</h2>
              </div>
              <p>
                If you have technical questions regarding our WebAssembly architecture or privacy implementation, please contact our team at{' '}
                <a href="mailto:privacy@bgremover.com" className="text-zinc-950 underline font-semibold">
                  privacy@bgremover.com
                </a>.
              </p>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
