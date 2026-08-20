import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { USE_CASES } from '@/data/usecases';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { generateSEO } from '@/lib/seo/metadata';
import { Layers, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface UseCaseSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.values(USE_CASES).map((uc) => ({
    slug: uc.slug,
  }));
}

export async function generateMetadata({ params }: UseCaseSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = USE_CASES[slug];

  if (!useCase) {
    return generateSEO({
      title: 'Use Case Not Found',
      description: 'The requested workflow does not exist.',
      path: `/use-cases/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: useCase.seoTitle || useCase.title,
    description: useCase.seoDescription || useCase.shortDescription,
    path: `/use-cases/${useCase.slug}`,
  });
}

export default async function UseCaseSlugPage({ params }: UseCaseSlugPageProps) {
  const { slug } = await params;
  const useCase = USE_CASES[slug];

  if (!useCase) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Use Cases', item: '/use-cases' },
    { name: useCase.title, item: `/use-cases/${useCase.slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4 shadow-vercel-sm">
              <Layers className="w-3.5 h-3.5 text-zinc-950" />
              <span>PRACTICAL WORKFLOW GUIDE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
              {useCase.title}
            </h1>
            <p className="text-zinc-600 text-base sm:text-xl leading-relaxed mb-6">
              {useCase.shortDescription}
            </p>

            <div className="p-4 rounded-xl bg-zinc-100 border border-zinc-200 text-xs text-zinc-700 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-zinc-950">Target Audience: </span>
                {useCase.targetAudience}
              </div>
              <Link
                href={useCase.toolCtaPath}
                className="px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-all shrink-0"
              >
                {useCase.toolCtaText} →
              </Link>
            </div>
          </header>

          {/* Key Benefits */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm mb-8">
            <h2 className="text-xl font-bold text-zinc-950 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-zinc-950" />
              <span>Key Workflow Advantages</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {useCase.keyBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Full Workflow Steps */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm mb-8 text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4">
            <h2 className="text-xl font-bold text-zinc-950 mb-2">Step-by-Step Practical Workflow</h2>
            {useCase.fullWorkflow.trim().split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </section>

          {/* Recommended Formats */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm mb-8">
            <h2 className="text-xl font-bold text-zinc-950 mb-3">Recommended Export Formats</h2>
            <div className="flex flex-wrap gap-2">
              {useCase.recommendedFormats.map((fmt, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono-tech text-zinc-900 font-semibold">
                  {fmt}
                </span>
              ))}
            </div>
          </section>

          {/* Use Case FAQs */}
          {useCase.faqs && useCase.faqs.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm mb-8">
              <h2 className="text-xl font-bold text-zinc-950 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-zinc-950" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-4">
                {useCase.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
                    <h3 className="font-bold text-sm text-zinc-950 mb-1">{faq.question}</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
