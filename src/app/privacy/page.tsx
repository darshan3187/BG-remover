import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff, ServerOff, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — 100% Private In-Browser AI',
  description: 'BG Remover guarantees 100% data privacy. All background removal tasks execute locally inside your web browser via WebAssembly with zero server uploads.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-6 shadow-vercel-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-950" />
            <span>ZERO SERVER UPLOADS GUARANTEE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
            Privacy Policy.
          </h1>

          <p className="text-zinc-600 text-sm sm:text-base mb-10 leading-relaxed">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>

          <div className="prose prose-zinc max-w-none space-y-8 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            
            {/* Section 1: Privacy Guarantee */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <div className="flex items-center gap-3 mb-4">
                <ServerOff className="w-5 h-5 text-zinc-950" />
                <h2 className="text-xl font-bold text-zinc-950 m-0">1. On-Device Processing Guarantee</h2>
              </div>
              <p>
                At BG Remover, we believe your personal photos and corporate visual assets should remain completely private. Unlike standard online image editors that transfer your uploaded files over the internet to remote cloud servers, BG Remover processes <strong>100% of image pixel operations locally inside your web browser</strong> using WebAssembly (WASM) neural network runtime.
              </p>
              <p>
                Zero bytes of your original photos or generated background cutout files are ever transmitted to or stored on any external server, database, or third-party cloud infrastructure.
              </p>
            </section>

            {/* Section 2: Data Collection */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <div className="flex items-center gap-3 mb-4">
                <EyeOff className="w-5 h-5 text-zinc-950" />
                <h2 className="text-xl font-bold text-zinc-950 m-0">2. No Data Collection or Image Logging</h2>
              </div>
              <p>
                Because all AI segmentation inference occurs in your device&apos;s local RAM memory:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
                <li>We do not collect, view, store, or sell your images.</li>
                <li>We do not record facial recognition metadata or EXIF camera coordinates.</li>
                <li>We do not train public AI models on your private photos.</li>
                <li>When you close your browser tab, all temporary image buffers are immediately wiped from memory.</li>
              </ul>
            </section>

            {/* Section 3: Cookies & Analytics */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-zinc-950" />
                <h2 className="text-xl font-bold text-zinc-950 m-0">3. Cookies & Local Browser Storage</h2>
              </div>
              <p>
                BG Remover does not use invasive advertising cookies or third-party tracking pixels. We use standard browser local storage solely to remember your user interface preferences (such as preferred studio background defaults or aspect ratio crop settings).
              </p>
            </section>

            {/* Section 4: Contact & Policy Updates */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-5 h-5 text-zinc-950" />
                <h2 className="text-xl font-bold text-zinc-950 m-0">4. Contact & Inquiries</h2>
              </div>
              <p>
                If you have questions regarding our privacy architecture or technical WebAssembly implementation, please contact our privacy team at{' '}
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
