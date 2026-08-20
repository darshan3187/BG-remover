import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ARTICLES } from '@/data/articles';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import { generateSEO } from '@/lib/seo/metadata';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return generateSEO({
      title: 'Article Not Found',
      description: 'The requested educational resource does not exist.',
      path: `/learn/${slug}`,
      noIndex: true,
    });
  }

  return generateSEO({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: `/learn/${article.slug}`,
    ogImage: article.featuredImage,
    ogType: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author.name],
    keywords: article.keywords,
  });
}

export default async function ArticleSlugPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter(
    (a) => a.slug !== article.slug && (a.category.slug === article.category.slug || article.relatedArticles?.includes(a.slug))
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main>
          <ArticleLayout article={article} relatedArticlesList={relatedArticles} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
