'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white text-zinc-600 text-xs py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-zinc-950 flex items-center justify-center shadow-vercel-sm shrink-0">
                <img src="/logo.webp" alt="BG Remover Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-sm text-zinc-950">BG Remover</span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              In-browser WebAssembly AI background removal studio and educational resource platform. Private, instant, and free.
            </p>
          </div>

          {/* Col 2: Tools */}
          <div>
            <h3 className="font-bold text-xs font-mono-tech uppercase text-zinc-950 tracking-wider mb-3">
              Image Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/background-remover" className="hover:text-zinc-950 transition-colors">
                  AI Background Remover
                </Link>
              </li>
              <li>
                <Link href="/bulk-background-remover" className="hover:text-zinc-950 transition-colors">
                  Bulk Background Remover
                </Link>
              </li>
              <li>
                <Link href="/transparent-background-maker" className="hover:text-zinc-950 transition-colors">
                  Transparent PNG Maker
                </Link>
              </li>
              <li>
                <Link href="/background-replacer" className="hover:text-zinc-950 transition-colors">
                  Background Replacer Studio
                </Link>
              </li>
              <li>
                <Link href="/image-cutout-tool" className="hover:text-zinc-950 transition-colors">
                  Precision Image Cutout
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Learn */}
          <div>
            <h3 className="font-bold text-xs font-mono-tech uppercase text-zinc-950 tracking-wider mb-3">
              Educational Hub
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/learn" className="hover:text-zinc-950 transition-colors font-medium text-zinc-900">
                  Knowledge Hub Main
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="hover:text-zinc-950 transition-colors">
                  Workflow Use Cases
                </Link>
              </li>
              <li>
                <Link href="/learn/glossary" className="hover:text-zinc-950 transition-colors">
                  Technical Glossary
                </Link>
              </li>
              <li>
                <Link href="/learn/category/background-removal" className="hover:text-zinc-950 transition-colors">
                  Background Removal Guides
                </Link>
              </li>
              <li>
                <Link href="/learn/category/ecommerce" className="hover:text-zinc-950 transition-colors">
                  E-Commerce Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Company */}
          <div>
            <h3 className="font-bold text-xs font-mono-tech uppercase text-zinc-950 tracking-wider mb-3">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-zinc-950 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-zinc-950 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-950 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-zinc-950 transition-colors">
                  Search Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-zinc-500">
          <div>© {new Date().getFullYear()} BG Remover. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-zinc-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-zinc-900 transition-colors">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-zinc-900 transition-colors font-mono-tech">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
