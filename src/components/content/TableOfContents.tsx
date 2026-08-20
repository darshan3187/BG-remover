'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse markdown headings (H2 and H3)
    const lines = content.split('\n');
    const items: HeadingItem[] = [];

    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match) {
        const text = h2Match[1].replace(/[*_]/g, '').trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        items.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].replace(/[*_]/g, '').trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        items.push({ id, text, level: 3 });
      }
    });

    setHeadings(items);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of Contents" className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-vercel-sm mb-8">
      <div className="flex items-center gap-2 font-bold text-sm text-zinc-950 mb-3 border-b border-zinc-100 pb-2">
        <List className="w-4 h-4 text-zinc-950" />
        <span>Table of Contents</span>
      </div>

      <ul className="space-y-1.5 text-xs">
        {headings.map((heading, idx) => (
          <li key={idx} style={{ paddingLeft: heading.level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${heading.id}`}
              className="text-zinc-600 hover:text-zinc-950 hover:underline transition-colors block py-0.5"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
