'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, ArrowUpRight } from 'lucide-react';

interface ToolItem {
  name: string;
  path: string;
  description: string;
}

const TOOL_DEFINITIONS: Record<string, ToolItem> = {
  '/background-remover': {
    name: 'AI Background Remover',
    path: '/background-remover',
    description: 'Instant 1-click in-browser background isolation.',
  },
  '/bulk-background-remover': {
    name: 'Bulk Background Remover',
    path: '/bulk-background-remover',
    description: 'Process 50+ images at once with ZIP download.',
  },
  '/transparent-background-maker': {
    name: 'Transparent PNG Maker',
    path: '/transparent-background-maker',
    description: 'Export uncompressed 8-bit alpha transparent PNGs.',
  },
  '/background-replacer': {
    name: 'Background Replacer',
    path: '/background-replacer',
    description: 'Swap backdrops with solid colors or mesh gradients.',
  },
  '/image-cutout-tool': {
    name: 'Precision Cutout Studio',
    path: '/image-cutout-tool',
    description: 'Sub-pixel edge matting and sticker outline glows.',
  },
};

interface RelatedToolsProps {
  toolPaths?: string[];
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ toolPaths = ['/background-remover', '/bulk-background-remover'] }) => {
  const tools = toolPaths.map((p) => TOOL_DEFINITIONS[p] || TOOL_DEFINITIONS['/background-remover']);

  return (
    <section className="my-8 p-6 rounded-2xl bg-zinc-950 text-white shadow-vercel-md">
      <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-white" />
        <span>TRY BG REMOVER TOOLS FREE</span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Put These Concepts into Practice</h3>
      <p className="text-xs text-zinc-300 mb-6 max-w-xl">
        Experience sub-second in-browser WebAssembly AI background removal. 100% private, zero server uploads, and unlimited 4K PNG exports.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool, idx) => (
          <Link
            key={idx}
            href={tool.path}
            className="group bg-zinc-900 hover:bg-zinc-850 p-4 rounded-xl border border-zinc-800 flex items-center justify-between transition-all"
          >
            <div>
              <div className="font-bold text-sm text-white group-hover:text-zinc-200 transition-colors flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-white" />
                <span>{tool.name}</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">{tool.description}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
};
