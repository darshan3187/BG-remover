import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { USE_CASES } from '@/data/usecases';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { generateSEO } from '@/lib/seo/metadata';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = generateSEO({
  title: 'Practical Workflows & Use Cases — BG Remover',
  description: 'Explore practical background removal workflows for e-commerce stores, product photography, social media thumbnails, professional headshots, and graphic design.',
  path: '/use-cases',
});

export default function UseCasesHubPage() {
  const useCaseList = Object.values(USE_CASES);

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Use Cases', item: '/use-cases' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <Breadcrumbs items={breadcrumbs} />

          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4 shadow-vercel-sm">
              <Layers className="w-3.5 h-3.5 text-zinc-950" />
              <span>PRACTICAL WORKFLOWS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
              Background Removal Use Cases.
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Step-by-step practical workflows, format recommendations, and optimization tips tailored for your specific industry or project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCaseList.map((uc) => (
              <div
                key={uc.slug}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-vercel-sm hover:border-zinc-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold text-zinc-950 mb-2">{uc.title}</h2>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                    {uc.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    {uc.keyBenefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                        <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <Link
                    href={`/use-cases/${uc.slug}`}
                    className="text-xs font-bold text-zinc-950 hover:underline flex items-center gap-1"
                  >
                    <span>View Workflow Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={uc.toolCtaPath}
                    className="px-4 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-all"
                  >
                    {uc.toolCtaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
