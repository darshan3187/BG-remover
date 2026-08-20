'use client';

import React from 'react';
import { ContentArticle } from '@/types/content';
import { Breadcrumbs } from './Breadcrumbs';
import { AuthorCard } from './AuthorCard';
import { TableOfContents } from './TableOfContents';
import { RelatedTools } from './RelatedTools';
import { RelatedArticles } from './RelatedArticles';
import { FAQSection } from '@/components/FAQSection';
import { getArticleSchema } from '@/lib/seo/schema';

interface ArticleLayoutProps {
  article: ContentArticle;
  relatedArticlesList?: ContentArticle[];
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  article,
  relatedArticlesList = [],
}) => {
  const breadcrumbItems = [
    { name: 'Learn', item: '/learn' },
    { name: article.category.name, item: `/learn/category/${article.category.slug}` },
    { name: article.title, item: `/learn/${article.slug}` },
  ];

  const articleSchema = getArticleSchema(article);

  // Render article body lines into formatted sections with auto IDs for Table of Contents
  const renderArticleBody = (text: string) => {
    const lines = text.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraphs: string[] = [];

    const flushParagraphs = (keyPrefix: string) => {
      if (currentParagraphs.length > 0) {
        const joined = currentParagraphs.join(' ');
        if (joined.trim()) {
          elements.push(
            <p key={`${keyPrefix}-p`} className="text-zinc-700 text-sm sm:text-base leading-relaxed mb-5">
              {joined}
            </p>
          );
        }
        currentParagraphs = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('## ')) {
        flushParagraphs(`line-${index}`);
        const headerText = trimmed.replace(/^##\s+/, '').replace(/[*_]/g, '');
        const id = headerText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h2
            key={`h2-${index}`}
            id={id}
            className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mt-10 mb-4 scroll-mt-20 border-b border-zinc-100 pb-2"
          >
            {headerText}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushParagraphs(`line-${index}`);
        const headerText = trimmed.replace(/^###\s+/, '').replace(/[*_]/g, '');
        const id = headerText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        elements.push(
          <h3
            key={`h3-${index}`}
            id={id}
            className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight mt-8 mb-3 scroll-mt-20"
          >
            {headerText}
          </h3>
        );
      } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        flushParagraphs(`line-${index}`);
        const bulletText = trimmed.replace(/^[*|-]\s+/, '');
        elements.push(
          <li key={`li-${index}`} className="text-zinc-700 text-sm sm:text-base leading-relaxed ml-5 list-disc mb-1.5">
            {bulletText}
          </li>
        );
      } else if (trimmed === '---') {
        flushParagraphs(`line-${index}`);
        elements.push(<hr key={`hr-${index}`} className="my-8 border-zinc-200" />);
      } else if (trimmed.length > 0) {
        currentParagraphs.push(trimmed);
      }
    });

    flushParagraphs('final');
    return elements;
  };

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <header className="mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4 shadow-vercel-sm">
            {article.category.name}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4 text-balance">
            {article.title}
          </h1>
          <p className="text-zinc-600 text-base sm:text-xl leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <AuthorCard
            author={article.author}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
            readingTimeMinutes={article.readingTimeMinutes}
          />
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-zinc-200 shadow-vercel-md bg-zinc-100">
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              width={1200}
              height={630}
              className="w-full max-h-[450px] object-cover"
            />
          </div>
        )}

        {/* Table of Contents */}
        <TableOfContents content={article.content} />

        {/* Article Body */}
        <div className="prose prose-zinc max-w-none">
          {renderArticleBody(article.content)}
        </div>

        {/* CTA to Tools */}
        <RelatedTools toolPaths={article.relatedTools} />

        {/* Optional Article FAQ */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-zinc-950 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-vercel-sm">
                  <h3 className="font-bold text-sm text-zinc-950 mb-1">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticlesList.length > 0 && (
          <RelatedArticles articles={relatedArticlesList} />
        )}
      </article>
    </>
  );
};
