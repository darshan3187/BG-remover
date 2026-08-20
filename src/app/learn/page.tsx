import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { generateSEO } from '@/lib/seo/metadata';
import { getWebsiteSchema } from '@/lib/seo/schema';
import { Sparkles, BookOpen, Tag, ArrowRight, Layers } from 'lucide-react';

export const metadata: Metadata = generateSEO({
  title: 'Learn — Image Background Removal Guides, Tutorials & Technical Resources',
  description: 'Master image background removal, WebAssembly AI, digital photography, e-commerce catalog standards, transparent PNG formats, and computer vision.',
  path: '/learn',
});

export default function LearnHubPage() {
  const websiteSchema = getWebsiteSchema();
  const featuredArticle = ARTICLES[0];
  const remainingArticles = ARTICLES.slice(1);
  const categoriesList = Object.values(CATEGORIES);
  const glossaryList = Object.values(GLOSSARY_TERMS);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      {websiteSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}

      <div>
        <Header />

        <main className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          {/* Eyebrow Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4 shadow-vercel-sm">
              <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
              <span>EDUCATIONAL KNOWLEDGE HUB</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
              Image Processing & AI Learning Center.
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Explore step-by-step tutorials, technical computer vision guides, e-commerce catalog standards, and transparency format specifications.
            </p>
          </div>

          {/* Featured Resource Hero */}
          {featuredArticle && (
            <div className="mb-14 bg-white rounded-3xl border border-zinc-200 shadow-vercel-md overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4">
                    FEATURED GUIDE • {featuredArticle.category.name}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mb-4">
                    <Link href={`/learn/${featuredArticle.slug}`} className="hover:text-zinc-700 transition-colors">
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <Link
                  href={`/learn/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs shadow-vercel-sm w-fit transition-all"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-zinc-100 min-h-[250px] lg:min-h-[auto] relative">
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.featuredImageAlt || featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Topic Category Clusters */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-zinc-950 mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-zinc-950" />
              <span>Browse by Category</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoriesList.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/learn/category/${cat.slug}`}
                  className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-vercel-sm hover:border-zinc-300 transition-all group"
                >
                  <h3 className="font-bold text-base text-zinc-950 group-hover:text-zinc-700 transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  <span className="text-[11px] font-mono-tech text-zinc-950 font-semibold flex items-center gap-1">
                    View Resources <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* All Articles Grid */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-zinc-950 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-zinc-950" />
              <span>All Educational Resources ({ARTICLES.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {remainingArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/learn/${article.slug}`}
                  className="group bg-white p-6 rounded-2xl border border-zinc-200 shadow-vercel-sm hover:shadow-vercel-md hover:border-zinc-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[10px] font-mono-tech mb-3">
                      {article.category.name}
                    </div>
                    <h3 className="font-bold text-base text-zinc-950 group-hover:text-zinc-700 transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono-tech text-zinc-500">
                    <span>{article.readingTimeMinutes} min read</span>
                    <span className="font-bold text-zinc-950 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Technical Glossary Teaser */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-vercel-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-zinc-950" />
                  <span>Computer Vision & Image Format Glossary</span>
                </h2>
                <p className="text-xs text-zinc-600 mt-1">
                  Technical definitions for alpha channels, segmentation algorithms, WebAssembly, and PNG formats.
                </p>
              </div>

              <Link
                href="/learn/glossary"
                className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-semibold border border-zinc-200 transition-all shrink-0"
              >
                View Full Glossary →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {glossaryList.slice(0, 4).map((item) => (
                <Link
                  key={item.slug}
                  href={`/learn/glossary/${item.slug}`}
                  className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-all"
                >
                  <div className="font-bold text-xs text-zinc-950 mb-1">{item.term}</div>
                  <p className="text-[11px] text-zinc-600 line-clamp-2">{item.definition}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
