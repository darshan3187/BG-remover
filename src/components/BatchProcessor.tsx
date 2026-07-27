'use client';

import React, { useState } from 'react';
import { Upload, Layers, CheckCircle2, Loader2, Trash2, FileArchive } from 'lucide-react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { removeBackgroundAI, formatBytes } from '@/utils/imageEngine';

interface BatchItem {
  id: string;
  file: File;
  originalUrl: string;
  fgUrl?: string;
  status: 'queued' | 'processing' | 'done' | 'error';
  timeMs?: number;
}

export const BatchProcessor: React.FC = () => {
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newItems: BatchItem[] = Array.from(files).map((file, i) => ({
      id: `${Date.now()}-${i}`,
      file,
      originalUrl: URL.createObjectURL(file),
      status: 'queued',
    }));

    setItems((prev) => [...prev, ...newItems]);
  };

  const startBatchProcess = async () => {
    if (items.length === 0 || isProcessing) return;
    setIsProcessing(true);

    const updatedItems = [...items];
    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].status === 'done') continue;

      updatedItems[i].status = 'processing';
      setItems([...updatedItems]);

      try {
        const result = await removeBackgroundAI(updatedItems[i].file);
        updatedItems[i].fgUrl = result.url;
        updatedItems[i].status = 'done';
        updatedItems[i].timeMs = result.timeMs;
      } catch (err) {
        console.error('Failed to process batch item:', err);
        updatedItems[i].status = 'error';
      }

      setItems([...updatedItems]);
    }

    setIsProcessing(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#171717', '#404040', '#737373'],
    });
  };

  const handleDownloadAllZip = async () => {
    const zip = new JSZip();
    const doneItems = items.filter((item) => item.status === 'done' && item.fgUrl);

    for (let i = 0; i < doneItems.length; i++) {
      const item = doneItems[i];
      if (!item.fgUrl) continue;

      const response = await fetch(item.fgUrl);
      const blob = await response.blob();
      const filename = item.file.name.replace(/\.[^/.]+$/, '') + '-no-bg.png';
      zip.file(filename, blob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(zipBlob);
    a.download = `bg-remover-batch-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      
      {/* Batch Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-white border border-zinc-200 mb-6 sm:mb-8 backdrop-blur-md shadow-vercel-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-zinc-950" aria-hidden="true" />
            <h2 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
              Batch Bulk Background Remover.
            </h2>
          </div>
          <p className="text-zinc-500 text-xs">
            Upload multiple images and process them concurrently in 100% private in-browser AI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <label className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-xs cursor-pointer border border-zinc-200 transition-all min-h-[44px]">
            <Upload className="w-3.5 h-3.5 text-zinc-900" />
            <span>Add Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFilesSelected}
              className="hidden"
            />
          </label>

          {items.length > 0 && (
            <button
              onClick={startBatchProcess}
              disabled={isProcessing}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs shadow-vercel-sm transition-all min-h-[44px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Batch…</span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Process All ({items.length})</span>
                </>
              )}
            </button>
          )}

          {items.some((i) => i.status === 'done') && (
            <button
              onClick={handleDownloadAllZip}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs shadow-vercel-sm transition-all min-h-[44px]"
            >
              <FileArchive className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Batch Items */}
      {items.length === 0 ? (
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-white border border-dashed border-zinc-300 shadow-vercel-sm">
          <Upload className="w-10 h-10 text-zinc-400 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-zinc-950 mb-1">No batch images selected</h3>
          <p className="text-zinc-500 text-xs mb-6">Select multiple product photos or portraits to process in bulk.</p>
          <label className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs cursor-pointer shadow-vercel-sm transition-all min-h-[44px]">
            <Upload className="w-4 h-4" />
            <span>Select Multiple Files</span>
            <input type="file" multiple accept="image/*" onChange={handleFilesSelected} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative p-3 rounded-xl bg-white border border-zinc-200 flex flex-col justify-between shadow-vercel-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-checkerboard shrink-0 border border-zinc-200">
                  <img
                    src={item.fgUrl || item.originalUrl}
                    alt={item.file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-zinc-950 truncate">{item.file.name}</span>
                  <span className="text-[10px] font-mono-tech text-zinc-500">{formatBytes(item.file.size)}</span>
                  {item.timeMs && (
                    <span className="text-[10px] font-mono-tech text-zinc-950">⚡ {item.timeMs}ms</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-1.5">
                  {item.status === 'queued' && (
                    <span className="text-[10px] font-mono-tech text-zinc-600 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">
                      QUEUED
                    </span>
                  )}
                  {item.status === 'processing' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono-tech text-zinc-950 px-2 py-0.5 rounded bg-zinc-200 border border-zinc-300">
                      <Loader2 className="w-3 h-3 animate-spin text-zinc-950" /> PROCESSING
                    </span>
                  )}
                  {item.status === 'done' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono-tech text-white px-2 py-0.5 rounded bg-zinc-950 border border-zinc-950">
                      <CheckCircle2 className="w-3 h-3 text-white" /> READY
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                  className="p-1.5 rounded text-zinc-400 hover:text-red-600 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
