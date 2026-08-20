'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types/content';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const schemaData = getBreadcrumbSchema(items);

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-zinc-500 font-mono-tech overflow-x-auto py-1">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-zinc-950 transition-colors shrink-0"
          title="Home"
        >
          <Home className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-[300px]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.item}
                  className="hover:text-zinc-950 transition-colors shrink-0 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
};
