'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Layers, ArrowRight, Tag } from 'lucide-react';
import { ARTICLES } from '@/data/articles';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { USE_CASES } from '@/data/usecases';

interface SearchContentProps {
  initialQuery?: string;
}

export const SearchContent: React.FC<SearchContentProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { articles: [], glossary: [], useCases: [] };

    const matchingArticles = ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.name.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q))
    );

    const matchingGlossary = Object.values(GLOSSARY_TERMS).filter(
      (g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)
    );

    const matchingUseCases = Object.values(USE_CASES).filter(
      (u) => u.title.toLowerCase().includes(q) || u.shortDescription.toLowerCase().includes(q)
    );

    return {
      articles: matchingArticles,
      glossary: matchingGlossary,
      useCases: matchingUseCases,
    };
  }, [query]);

  const totalMatches = results.articles.length + results.glossary.length + results.useCases.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search educational resources, tutorials, glossary terms..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-zinc-200 text-zinc-950 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-950 shadow-vercel-sm transition-all"
        />
      </div>

      {query.trim() === '' ? (
        <div className="text-center py-12 text-zinc-500 text-sm">
          Type a search term above to explore educational articles, image specs, and technical glossary definitions.
        </div>
      ) : totalMatches === 0 ? (
        <div className="text-center py-12 text-zinc-600 text-sm">
          No resources found matching &quot;{query}&quot;. Try searching for &quot;PNG&quot;, &quot;hair&quot;, &quot;e-commerce&quot;, or &quot;WebAssembly&quot;.
        </div>
      ) : (
        <div className="space-y-8">
          {/* Articles Section */}
          {results.articles.length > 0 && (
            <div>
              <h2 className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-zinc-950" />
                <span>Educational Articles ({results.articles.length})</span>
              </h2>

              <div className="space-y-3">
                {results.articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/learn/${article.slug}`}
                    className="group bg-white p-5 rounded-2xl border border-zinc-200 shadow-vercel-sm hover:border-zinc-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="inline-block px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-[10px] font-mono-tech text-zinc-700 mb-2">
                        {article.category.name}
                      </div>
                      <h3 className="font-bold text-base text-zinc-950 group-hover:text-zinc-700 transition-colors mb-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-zinc-600 line-clamp-2">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Terms */}
          {results.glossary.length > 0 && (
            <div>
              <h2 className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-zinc-950" />
                <span>Glossary Definitions ({results.glossary.length})</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.glossary.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/learn/glossary/${term.slug}`}
                    className="bg-white p-4 rounded-xl border border-zinc-200 shadow-vercel-sm hover:border-zinc-300 transition-all"
                  >
                    <div className="font-bold text-sm text-zinc-950 mb-1">{term.term}</div>
                    <p className="text-xs text-zinc-600 line-clamp-2">{term.definition}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases */}
          {results.useCases.length > 0 && (
            <div>
              <h2 className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-zinc-950" />
                <span>Workflows & Use Cases ({results.useCases.length})</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.useCases.map((useCase) => (
                  <Link
                    key={useCase.slug}
                    href={`/use-cases/${useCase.slug}`}
                    className="bg-white p-4 rounded-xl border border-zinc-200 shadow-vercel-sm hover:border-zinc-300 transition-all"
                  >
                    <div className="font-bold text-sm text-zinc-950 mb-1">{useCase.title}</div>
                    <p className="text-xs text-zinc-600 line-clamp-2">{useCase.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
