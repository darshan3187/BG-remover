import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchContent } from '@/components/content/SearchContent';
import { generateSEO } from '@/lib/seo/metadata';

export const metadata: Metadata = generateSEO({
  title: 'Search Educational Resources & Guides — BG Remover',
  description: 'Search across BG Remover educational articles, image specs, tutorials, and technical glossary definitions.',
  path: '/search',
  noIndex: true, // Deliberately exclude search result pages from Google index to prevent search index bloat
});

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="py-8">
          <div className="max-w-4xl mx-auto px-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
              Search Educational Resources
            </h1>
          </div>

          <SearchContent initialQuery={q || ''} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
