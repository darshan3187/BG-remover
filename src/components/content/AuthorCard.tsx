'use client';

import React from 'react';
import { Author } from '@/types/content';
import { UserCheck } from 'lucide-react';

interface AuthorCardProps {
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  publishedAt,
  updatedAt,
  readingTimeMinutes,
}) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200 shadow-vercel-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-12 h-12 rounded-full object-cover border border-zinc-200 shadow-sm"
        />
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-zinc-950">{author.name}</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-zinc-100 border border-zinc-200 text-[10px] font-mono-tech text-zinc-700">
              <UserCheck className="w-3 h-3 text-zinc-950" />
              <span>Verified Author</span>
            </span>
          </div>
          <div className="text-xs text-zinc-500">{author.role}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono-tech border-t sm:border-t-0 sm:border-l border-zinc-100 pt-3 sm:pt-0 sm:pl-4">
        <div>
          <span className="block text-[10px] text-zinc-400 uppercase">Published</span>
          <time dateTime={publishedAt}>{publishedAt}</time>
        </div>
        {updatedAt && (
          <div>
            <span className="block text-[10px] text-zinc-400 uppercase">Updated</span>
            <time dateTime={updatedAt}>{updatedAt}</time>
          </div>
        )}
        <div>
          <span className="block text-[10px] text-zinc-400 uppercase">Reading Time</span>
          <span>{readingTimeMinutes} min read</span>
        </div>
      </div>
    </div>
  );
};
