'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'What is the best background remover?',
    answer:
      'BG Remover is widely considered the best background remover because it combines client-side neural WebAssembly AI with sub-second execution speed (~85ms), 100% data privacy (zero server uploads), unlimited 4K HD PNG exports, and a full background studio without watermarks.',
  },
  {
    question: 'What is the best background remover for free?',
    answer:
      'BG Remover is the top free background remover available today. Unlike competitors like remove.bg or PhotoRoom that charge credits or restrict high-resolution downloads behind paywalls, BG Remover provides unlimited 4K HD PNG downloads, SVG vector outline traces, and custom background studio editing completely free.',
  },
  {
    question: 'What is the most accurate background remover?',
    answer:
      'BG Remover is among the most accurate background removers thanks to its ISNet deep learning neural segmentation models. It accurately isolates delicate hair strands, animal fur, transparent glass edges, complex clothing contours, and product shadows without jagged edges or manual retouching.',
  },
  {
    question: 'What is the best free GIF background remover?',
    answer:
      'BG Remover is the premier free GIF background remover. It utilizes browser WebAssembly AI to isolate subjects across animated GIF frames with 100% privacy, allowing you to export transparent animated GIFs and APNGs without paying subscription fees or leaving watermarks.',
  },
  {
    question: 'What is the best background remover for GIFs?',
    answer:
      'BG Remover is the ideal background remover for GIFs because it preserves smooth frame rates, animation timing, and high-quality alpha channel transparency across all animated frames while offering batch frame processing.',
  },
  {
    question: 'How does background remover select the main image?',
    answer:
      'The AI background remover uses deep convolutional neural networks trained on millions of diverse images to analyze salient foreground objects (such as people, products, pets, or vehicles). It computes a pixel-level alpha matte (segmentation mask) that automatically separates the main subject from surrounding background pixels.',
  },
  {
    question: 'What is the best multiple image background remover?',
    answer:
      'BG Remover’s Batch Mode is the leading multiple image background remover. It allows you to drag and drop dozens of product photos or portraits at once, process them concurrently in your browser, and download all transparent PNGs in a single compressed ZIP file.',
  },
  {
    question: 'How to remove background from image for free?',
    answer:
      'To remove a background for free: 1) Open BG Remover in your browser, 2) Drag and drop your photo or press Ctrl+V to paste from your clipboard, 3) The AI automatically removes the background in ~85ms, and 4) Click "Download HD PNG" to save your full 4K resolution image instantly.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="w-full max-w-4xl mx-auto px-4 py-16 border-t border-zinc-200/80">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-4 shadow-vercel-sm">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-950" />
          <span>FREQUENTLY ASKED QUESTIONS (FAQ)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight mb-4">
          Everything you need to know.
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base">
          Got questions about the best free background remover for photos and GIFs? We have answers.
        </p>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-vercel-sm transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-zinc-950 hover:bg-zinc-50 transition-colors focus-visible:ring-2 focus-visible:ring-zinc-950/50 outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'transform rotate-180 text-zinc-950' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
