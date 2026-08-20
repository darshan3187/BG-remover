import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CATEGORIES } from '@/data/categories';
import { ARTICLES } from '@/data/articles';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { generateSEO } from '@/lib/seo/metadata';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.values(CATEGORIES).map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = CATEGORIES[slug];

  if (!category) {
    return generateSEO({
      title: 'Category Not Found',
      description: 'The requested category does not exist.',
      path: `/learn/category/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: category.seoTitle || `${category.name} Guides & Resources`,
    description: category.seoDescription || category.description,
    path: `/learn/category/${category.slug}`,
  });
}

export default async function CategorySlugPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = CATEGORIES[slug];

  if (!category) {
    notFound();
  }

  const categoryArticles = ARTICLES.filter((a) => a.category.slug === category.slug);

  const breadcrumbs = [
    { name: 'Learn', item: '/learn' },
    { name: category.name, item: `/learn/category/${category.slug}` },
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
              <span>TOPICAL CLUSTER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
              {category.name}
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              {category.description}
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-zinc-950 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-zinc-950" />
              <span>Resources in this Category ({categoryArticles.length})</span>
            </h2>

            {categoryArticles.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center text-zinc-500 text-sm">
                No articles currently available in this category. Check back soon for new guides!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
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
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
