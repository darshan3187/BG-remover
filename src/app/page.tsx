'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Uploader } from '@/components/Uploader';
import { Footer } from '@/components/Footer';
import { ProcessedImageResult } from '@/types';
import { removeBackgroundAI, formatBytes, preloadAIModel } from '@/utils/imageEngine';

// Dynamically import non-critical and heavy components to shrink initial JS bundle size
const EditorStudio = dynamic(() => import('@/components/EditorStudio').then((mod) => mod.EditorStudio), {
  ssr: false,
});
const BatchProcessor = dynamic(() => import('@/components/BatchProcessor').then((mod) => mod.BatchProcessor), {
  ssr: false,
});
const CompetitorComparison = dynamic(() => import('@/components/CompetitorComparison').then((mod) => mod.CompetitorComparison));
const SEOContentSection = dynamic(() => import('@/components/SEOContentSection').then((mod) => mod.SEOContentSection));
const FAQSection = dynamic(() => import('@/components/FAQSection').then((mod) => mod.FAQSection));
const DynamicLoadingState = dynamic(() => import('@/components/DynamicLoadingState').then((mod) => mod.DynamicLoadingState), {
  ssr: false,
});

export default function Home() {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [processedResult, setProcessedResult] = useState<ProcessedImageResult | null>(null);

  // Pre-warm WASM AI engine model ONLY when browser is idle after initial render/paint
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const schedulePreload = () => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => preloadAIModel(), { timeout: 5000 });
        } else {
          setTimeout(() => preloadAIModel(), 4000);
        }
      };

      if (document.readyState === 'complete') {
        schedulePreload();
      } else {
        window.addEventListener('load', schedulePreload, { once: true });
        return () => window.removeEventListener('load', schedulePreload);
      }
    }
  }, []);

  const handleImageSelected = async (fileOrUrl: File | string, fileName?: string) => {
    setIsLoading(true);
    setLoadingStep('Removing background in WASM AI...');

    try {
      let originalUrl = '';
      let name = fileName || 'image.png';
      let fileSize = '2.4 MB';

      if (typeof fileOrUrl === 'string') {
        originalUrl = fileOrUrl;
      } else {
        originalUrl = URL.createObjectURL(fileOrUrl);
        name = fileOrUrl.name;
        fileSize = formatBytes(fileOrUrl.size);
      }

      // Load image dimensions
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = originalUrl;
      });

      const { url: fgImageUrl, timeMs } = await removeBackgroundAI(fileOrUrl);

      setProcessedResult({
        originalUrl,
        fgImageUrl,
        processedUrl: fgImageUrl,
        originalWidth: img.naturalWidth || img.width,
        originalHeight: img.naturalHeight || img.height,
        processingTimeMs: timeMs,
        fileName: name,
        fileSizeFormatted: fileSize,
      });

    } catch (error) {
      console.error('Failed to process background removal:', error);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleReset = () => {
    setProcessedResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-zinc-950 selection:text-white">
      
      <div>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} onReset={handleReset} />

        <main className="pt-4" id="main-content">
          {activeTab === 'batch' ? (
            <BatchProcessor />
          ) : (
            <>
              {!processedResult && !isLoading && (
                <>
                  <section id="hero-section">
                    <Hero />
                  </section>
                  <section id="uploader-zone">
                    <Uploader onImageSelected={handleImageSelected} isLoading={isLoading} />
                  </section>
                  <section id="competitor-matrix">
                    <CompetitorComparison />
                  </section>
                  <section id="seo-content">
                    <SEOContentSection />
                  </section>
                  <section id="faq-section">
                    <FAQSection />
                  </section>
                </>
              )}

              {/* Dynamic Animated Loading State */}
              {isLoading && (
                <DynamicLoadingState loadingStep={loadingStep} />
              )}

              {/* Studio Editor View */}
              {processedResult && !isLoading && (
                <section id="editor-workspace">
                  <EditorStudio processedResult={processedResult} onReset={handleReset} />
                </section>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />

    </div>
  );
}
