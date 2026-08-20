import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { generateSEO } from '@/lib/seo/metadata';
import { Tag, ArrowRight } from 'lucide-react';

export const metadata: Metadata = generateSEO({
  title: 'Image Processing & Computer Vision Glossary — BG Remover',
  description: 'Comprehensive technical glossary explaining alpha channels, image segmentation algorithms, PNG formats, WebAssembly, and computer vision concepts.',
  path: '/learn/glossary',
});

export default function GlossaryHubPage() {
  const termsList = Object.values(GLOSSARY_TERMS);

  const breadcrumbs = [
    { name: 'Learn', item: '/learn' },
    { name: 'Glossary', item: '/learn/glossary' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <Breadcrumbs items={breadcrumbs} />

          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4 shadow-vercel-sm">
              <Tag className="w-3.5 h-3.5 text-zinc-950" />
              <span>TECHNICAL TERMINOLOGY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
              Image Processing Glossary.
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Clear technical definitions for alpha channels, neural segmentation, WebAssembly, ONNX runtimes, and digital image formats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {termsList.map((term) => (
              <Link
                key={term.slug}
                href={`/learn/glossary/${term.slug}`}
                className="group bg-white p-6 rounded-2xl border border-zinc-200 shadow-vercel-sm hover:shadow-vercel-md hover:border-zinc-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono-tech text-zinc-500 uppercase tracking-wider mb-2">
                    {term.category}
                  </div>
                  <h2 className="text-xl font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors mb-2">
                    {term.term}
                  </h2>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                    {term.definition}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-zinc-950 group-hover:translate-x-0.5 transition-transform pt-4 border-t border-zinc-100">
                  <span>View Explanation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
