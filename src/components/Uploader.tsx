'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { SampleImage } from '@/types';

interface UploaderProps {
  onImageSelected: (fileOrUrl: File | string, fileName?: string) => void;
  isLoading: boolean;
}

const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: '1',
    title: 'Portrait Person',
    category: 'Portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    title: 'Sneaker Shoe',
    category: 'Product',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    title: 'Cute Dog',
    category: 'Animal',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    title: 'Sports Car',
    category: 'Vehicle',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '5',
    title: 'Fashion Model',
    category: 'Graphic',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80',
  },
];

export const Uploader: React.FC<UploaderProps> = ({ onImageSelected, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global Clipboard Paste Listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (isLoading) return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            onImageSelected(file, file.name || 'clipboard-pasted-image.png');
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onImageSelected, isLoading]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelected(file, file.name);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onImageSelected(file, file.name);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4">
      {/* Drag & Drop Main Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
          isDragging
            ? 'bg-zinc-100 border-2 border-dashed border-zinc-900 shadow-vercel-glow scale-[1.01]'
            : 'bg-white border border-zinc-200 hover:border-zinc-950 shadow-vercel-md hover:shadow-vercel-glow'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        aria-label="Upload image or drop image here"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp, image/avif"
          className="hidden"
          aria-hidden="true"
        />

        <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center relative z-10">
          {/* Upload Icon */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-zinc-950 group-hover:text-white transition-all">
            <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 group-hover:text-white group-hover:animate-bounce" aria-hidden="true" />
          </div>

          <h2 className="text-lg sm:text-2xl font-semibold text-zinc-950 mb-2 tracking-tight">
            Drop an image or <span className="text-zinc-950 underline underline-offset-4 decoration-zinc-400">upload a file</span>
          </h2>
          
          <p className="text-zinc-500 text-xs sm:text-sm mb-6 max-w-md">
            Supports PNG, JPG, WebP, AVIF up to 50MB. <br className="hidden sm:inline" />
            <span className="hidden sm:inline">Or press <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-xs font-mono-tech text-zinc-800">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-xs font-mono-tech text-zinc-800">V</kbd> anywhere to paste.</span>
          </p>

          {/* Call to action pill button (Touch-friendly 44px min height) */}
          <div className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm shadow-vercel-sm group-hover:shadow-vercel-glow group-hover:scale-105 transition-all min-h-[44px]">
            <ImageIcon className="w-4 h-4" aria-hidden="true" />
            <span>Select Image</span>
          </div>
        </div>
      </div>

      {/* Sample Images Section */}
      <div className="mt-6 sm:mt-8">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-mono-tech uppercase tracking-wider font-semibold text-zinc-500">
              No image? Try these samples
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onImageSelected(sample.url, `${sample.title.toLowerCase().replace(/\s+/g, '-')}.jpg`)}
              className="group relative rounded-xl overflow-hidden bg-white border border-zinc-200 hover:border-zinc-950 shadow-vercel-sm transition-all text-left focus-visible:ring-2 focus-visible:ring-zinc-950/50 outline-none min-h-[44px]"
              aria-label={`Test sample image: ${sample.title}`}
            >
              <div className="aspect-square relative w-full overflow-hidden bg-zinc-100">
                <img
                  src={sample.thumb}
                  alt={sample.title}
                  width={80}
                  height={80}
                  decoding="async"
                  fetchPriority="low"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-[10px] sm:text-[11px] font-medium text-white truncate">
                  {sample.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
