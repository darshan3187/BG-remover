'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ContentArticle } from '@/types/content';

interface RelatedArticlesProps {
  articles: ContentArticle[];
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-zinc-200/80">
      <div className="flex items-center gap-2 font-bold text-lg text-zinc-950 mb-6">
        <BookOpen className="w-5 h-5 text-zinc-950" />
        <h2>Related Resources & Guides</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/learn/${article.slug}`}
            className="group bg-white p-5 rounded-2xl border border-zinc-200 shadow-vercel-sm hover:shadow-vercel-md hover:border-zinc-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[10px] font-mono-tech mb-3">
                {article.category.name}
              </div>
              <h3 className="font-bold text-sm text-zinc-950 group-hover:text-zinc-700 transition-colors mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-4">
                {article.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-zinc-950 group-hover:translate-x-0.5 transition-transform">
              <span>Read Resource</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
