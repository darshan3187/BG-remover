import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { ARTICLES } from '@/data/articles';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { RelatedTools } from '@/components/content/RelatedTools';
import { generateSEO } from '@/lib/seo/metadata';
import { Tag, ArrowRight } from 'lucide-react';

interface GlossarySlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.values(GLOSSARY_TERMS).map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: GlossarySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = GLOSSARY_TERMS[slug];

  if (!term) {
    return generateSEO({
      title: 'Glossary Term Not Found',
      description: 'The requested glossary term does not exist.',
      path: `/learn/glossary/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: term.seoTitle || `${term.term} — Image Processing Glossary`,
    description: term.seoDescription || term.definition,
    path: `/learn/glossary/${term.slug}`,
  });
}

export default async function GlossarySlugPage({ params }: GlossarySlugPageProps) {
  const { slug } = await params;
  const term = GLOSSARY_TERMS[slug];

  if (!term) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Learn', item: '/learn' },
    { name: 'Glossary', item: '/learn/glossary' },
    { name: term.term, item: `/learn/glossary/${term.slug}` },
  ];

  const relatedArticles = ARTICLES.filter((a) => term.relatedArticles?.includes(a.slug));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4">
              <Tag className="w-3.5 h-3.5 text-zinc-950" />
              <span>{term.category}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
              {term.term}
            </h1>
            <p className="text-zinc-600 text-base sm:text-xl leading-relaxed border-l-4 border-zinc-950 pl-4 py-1 font-medium bg-white rounded-r-xl border border-zinc-200 shadow-vercel-sm">
              {term.definition}
            </p>
          </header>

          <article className="prose prose-zinc max-w-none bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-sm mb-10 text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4">
            {term.fullExplanation.trim().split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </article>

          {/* Related Educational Articles */}
          {relatedArticles.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-zinc-950 mb-4">Related Educational Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/learn/${art.slug}`}
                    className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-vercel-sm hover:border-zinc-300 transition-all group"
                  >
                    <h3 className="font-bold text-sm text-zinc-950 group-hover:text-zinc-700 transition-colors mb-1">
                      {art.title}
                    </h3>
                    <p className="text-xs text-zinc-600 line-clamp-2 mb-3">{art.excerpt}</p>
                    <span className="text-xs font-bold text-zinc-950 flex items-center gap-1">
                      Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <RelatedTools />
        </main>
      </div>

      <Footer />
    </div>
  );
}
