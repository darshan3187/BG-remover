'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Sliders, Sun, ZoomIn, ZoomOut, ArrowLeft, FileCode2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  BackgroundState, ShadowState, StickerOutlineState, AdjustmentsState, 
  AspectRatioType, ProcessedImageResult 
} from '@/types';
import { renderCompositeStudio, generateSvgOutline } from '@/utils/imageEngine';

interface EditorStudioProps {
  processedResult: ProcessedImageResult;
  onReset: () => void;
}

const STOCK_WALLPAPERS = [
  { id: 'studio-light', title: 'Studio Soft Light', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { id: 'office-desk', title: 'Minimalist Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sunset-beach', title: 'Warm Sunset', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
  { id: 'neon-city', title: 'Cyber Neon', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80' },
  { id: 'soft-gradient', title: 'Pastel Gradient', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80' },
];

export const EditorStudio: React.FC<EditorStudioProps> = ({ processedResult, onReset }) => {
  // Tab Selection
  const [activeTab, setActiveTab] = useState<'bg' | 'effects' | 'crop'>('bg');
  const [viewMode, setViewMode] = useState<'split' | 'single'>('split');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  // Studio States
  const [bgState, setBgState] = useState<BackgroundState>({
    type: 'transparent',
    color: '#ffffff',
    gradient: 'cyan',
    blurAmount: 15,
  });

  const [shadowState, setShadowState] = useState<ShadowState>({
    enabled: false,
    color: '#000000',
    blur: 15,
    offsetX: 0,
    offsetY: 10,
    opacity: 0.3,
  });

  const [outlineState, setOutlineState] = useState<StickerOutlineState>({
    enabled: false,
    color: '#ffffff',
    thickness: 8,
    blur: 0,
  });

  const [adjustments, setAdjustments] = useState<AdjustmentsState>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    feathering: 0,
  });

  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('original');
  const [renderedCompositeUrl, setRenderedCompositeUrl] = useState<string>(processedResult.fgImageUrl);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef(false);

  // Live Composite Render trigger
  useEffect(() => {
    let isSubscribed = true;
    renderCompositeStudio({
      fgImageUrl: processedResult.fgImageUrl,
      originalImageUrl: processedResult.originalUrl,
      bgState,
      shadowState,
      outlineState,
      adjustments,
      aspectRatio,
    }).then((compositeUrl) => {
      if (isSubscribed) {
        setRenderedCompositeUrl(compositeUrl);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [processedResult, bgState, shadowState, outlineState, adjustments, aspectRatio]);

  // Handle Split Slider Dragging (Mouse & Touch Events for Mobile)
  const handleMouseDown = () => { isDraggingSlider.current = true; };
  const handleMouseUp = () => { isDraggingSlider.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSlider.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchStart = () => { isDraggingSlider.current = true; };
  const handleTouchEnd = () => { isDraggingSlider.current = false; };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingSlider.current || !containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Download Trigger with Confetti
  const handleDownload = (format: 'png' | 'jpg' | 'webp' | 'svg') => {
    setIsExporting(true);
    
    if (format === 'svg') {
      generateSvgOutline(processedResult.fgImageUrl).then((svgStr) => {
        const blob = new Blob([svgStr], { type: 'image/svg+xml' });
        triggerFileSave(blob, `${processedResult.fileName}-outline.svg`);
        setIsExporting(false);
      });
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (format === 'jpg' && bgState.type === 'transparent') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      const mimeType = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      
      canvas.toBlob((blob) => {
        if (blob) {
          triggerFileSave(blob, `${processedResult.fileName}-no-bg.${format}`);
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#171717', '#404040', '#737373'],
          });
        }
        setIsExporting(false);
      }, mimeType, 0.95);
    };
    img.src = renderedCompositeUrl;
  };

  const triggerFileSave = (blob: Blob, filename: string) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pb-16">
      
      {/* Studio Header Bar - Fully Responsive for Mobile & Desktop */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-zinc-200 mb-4 sm:mb-6 backdrop-blur-md shadow-vercel-sm">
        
        <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-zinc-950/50 outline-none min-h-[36px]"
            aria-label="Upload new image"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back</span>
          </button>

          <div className="h-4 w-[1px] bg-zinc-200 hidden sm:block" />

          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-zinc-950 truncate max-w-[140px] sm:max-w-[260px]">
              {processedResult.fileName}
            </span>
            <span className="text-[10px] font-mono-tech text-zinc-500">
              {processedResult.originalWidth} × {processedResult.originalHeight}px • {processedResult.fileSizeFormatted}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-[10px] font-mono-tech font-semibold shrink-0">
            ⚡ {processedResult.processingTimeMs}ms
          </span>
        </div>

        {/* View Mode, Zoom & Download CTA (Mobile Stacking) */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2">
          
          <div className="flex items-center p-0.5 rounded-lg bg-zinc-100 border border-zinc-200">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all min-h-[32px] ${
                viewMode === 'split' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={`px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all min-h-[32px] ${
                viewMode === 'single' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Single
            </button>
          </div>

          <div className="flex items-center gap-1 bg-zinc-100 border border-zinc-200 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
              className="p-1.5 rounded text-zinc-600 hover:text-zinc-950 min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono-tech text-zinc-700 w-9 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.25))}
              className="p-1.5 rounded text-zinc-600 hover:text-zinc-950 min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download Action Pills (Touch friendly full-width button on small screens) */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => handleDownload('png')}
              disabled={isExporting}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs shadow-vercel-sm hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/50 min-h-[44px]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download HD PNG</span>
            </button>

            <button
              onClick={() => handleDownload('svg')}
              className="px-3 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 text-xs font-mono-tech transition-all min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
              title="Download SVG Vector Outline"
            >
              <FileCode2 className="w-4 h-4 text-zinc-900" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Studio Workplace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Left/Center Preview Canvas */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center">
          
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-vercel-md flex items-center justify-center select-none touch-none"
          >
            <div 
              className="relative max-w-full max-h-full transition-transform duration-150 flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              
              {viewMode === 'split' ? (
                /* Split-Screen Slider View with Mobile Touch Support */
                <div className="relative w-full h-full max-w-[800px] aspect-auto flex items-center justify-center overflow-hidden">
                  
                  {/* Layer 1: AFTER image (Background removed studio composite) */}
                  <div className={`w-full h-full relative flex items-center justify-center ${bgState.type === 'transparent' ? 'bg-checkerboard' : ''}`}>
                    <img
                      src={renderedCompositeUrl}
                      alt="Background removed preview"
                      className="max-h-[350px] sm:max-h-[500px] w-auto object-contain mx-auto select-none pointer-events-none"
                    />
                  </div>

                  {/* Layer 2: BEFORE image (Clipped to slider percentage) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-zinc-100 select-none pointer-events-none"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                  >
                    <img
                      src={processedResult.originalUrl}
                      alt="Original before image"
                      className="max-h-[350px] sm:max-h-[500px] w-auto object-contain mx-auto select-none pointer-events-none"
                    />
                  </div>

                  {/* Vertical Divider Line */}
                  <div 
                    className="absolute top-0 bottom-0 z-20 w-0.5 bg-zinc-950 shadow-xl pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  />

                  {/* Draggable Divider Handle with Touch Support */}
                  <div
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    className="absolute top-0 bottom-0 z-30 w-10 -ml-5 flex items-center justify-center cursor-ew-resize group"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-125 transition-transform">
                      <Sliders className="w-4 h-4 transform rotate-90" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Labels */}
                  <span className="absolute top-3 left-3 z-30 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-white/90 text-[9px] sm:text-[10px] font-mono-tech text-zinc-700 border border-zinc-200 shadow-sm pointer-events-none">
                    BEFORE
                  </span>
                  <span className="absolute top-3 right-3 z-30 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-zinc-950 text-[9px] sm:text-[10px] font-mono-tech text-white shadow-sm pointer-events-none">
                    AFTER
                  </span>
                </div>
              ) : (
                /* Single Canvas View */
                <div className={`relative max-h-[350px] sm:max-h-[500px] rounded-xl overflow-hidden ${bgState.type === 'transparent' ? 'bg-checkerboard' : ''}`}>
                  <img
                    src={renderedCompositeUrl}
                    alt="Single view output"
                    className="max-h-[350px] sm:max-h-[500px] w-auto object-contain"
                  />
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Sidebar Controls (Touch friendly tabs on Mobile) */}
        <div className="bg-white/90 border border-zinc-200 rounded-2xl p-4 sm:p-5 flex flex-col h-full backdrop-blur-md shadow-vercel-sm">
          
          <div className="flex items-center p-1 bg-zinc-100 border border-zinc-200 rounded-xl mb-4 sm:mb-6">
            <button
              onClick={() => setActiveTab('bg')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all min-h-[36px] ${
                activeTab === 'bg' ? 'bg-white text-zinc-950 shadow-sm font-semibold' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Background
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all min-h-[36px] ${
                activeTab === 'effects' ? 'bg-white text-zinc-950 shadow-sm font-semibold' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Effects
            </button>
            <button
              onClick={() => setActiveTab('crop')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all min-h-[36px] ${
                activeTab === 'crop' ? 'bg-white text-zinc-950 shadow-sm font-semibold' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Re-frame
            </button>
          </div>

          {/* TAB 1: BACKGROUND STUDIO */}
          {activeTab === 'bg' && (
            <div className="space-y-5 sm:space-y-6 flex-1 overflow-y-auto pr-1">
              
              <div>
                <label className="text-xs font-semibold text-zinc-900 mb-2 block">
                  Background Style
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setBgState({ ...bgState, type: 'transparent' })}
                    className={`p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-medium flex flex-col items-center gap-1 transition-all min-h-[44px] ${
                      bgState.type === 'transparent'
                        ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-checkerboard border border-zinc-300" />
                    <span>Clear</span>
                  </button>

                  <button
                    onClick={() => setBgState({ ...bgState, type: 'color' })}
                    className={`p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-medium flex flex-col items-center gap-1 transition-all min-h-[44px] ${
                      bgState.type === 'color'
                        ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white border border-zinc-300" />
                    <span>Color</span>
                  </button>

                  <button
                    onClick={() => setBgState({ ...bgState, type: 'gradient' })}
                    className={`p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-medium flex flex-col items-center gap-1 transition-all min-h-[44px] ${
                      bgState.type === 'gradient'
                        ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-gradient-to-tr from-zinc-800 to-zinc-400" />
                    <span>Gradient</span>
                  </button>

                  <button
                    onClick={() => setBgState({ ...bgState, type: 'blur' })}
                    className={`p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-medium flex flex-col items-center gap-1 transition-all min-h-[44px] ${
                      bgState.type === 'blur'
                        ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Blur BG</span>
                  </button>
                </div>
              </div>

              {/* Color Picker (Touch friendly size) */}
              {bgState.type === 'color' && (
                <div>
                  <label className="text-xs font-medium text-zinc-700 mb-2 block">
                    Solid Color Presets
                  </label>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {['#ffffff', '#000000', '#f4f4f5', '#e4e4e7', '#a1a1aa', '#71717a', '#52525b', '#27272a', '#18181b'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setBgState({ ...bgState, color: c })}
                        className={`w-8 h-8 rounded-full border transition-transform ${
                          bgState.color === c ? 'scale-125 border-zinc-950 ring-2 ring-zinc-950/30' : 'border-zinc-300 hover:scale-110'
                        }`}
                        style={{ backgroundColor: c }}
                        aria-label={`Select color ${c}`}
                      />
                    ))}
                    
                    <input
                      type="color"
                      value={bgState.color}
                      onChange={(e) => setBgState({ ...bgState, color: e.target.value })}
                      className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-0"
                      title="Custom Color Picker"
                    />
                  </div>
                </div>
              )}

              {/* Blur Slider */}
              {bgState.type === 'blur' && (
                <div>
                  <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                    <span>Background Bokeh Blur</span>
                    <span className="font-mono-tech text-zinc-950">{bgState.blurAmount}px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={bgState.blurAmount}
                    onChange={(e) => setBgState({ ...bgState, blurAmount: parseInt(e.target.value) })}
                    className="w-full accent-zinc-950 bg-zinc-200 rounded-lg cursor-pointer h-2"
                  />
                </div>
              )}

              {/* Stock Wallpapers */}
              <div>
                <label className="text-xs font-semibold text-zinc-900 mb-2 block">
                  HD Backdrop Presets
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {STOCK_WALLPAPERS.map((wall) => (
                    <button
                      key={wall.id}
                      onClick={() => setBgState({ ...bgState, type: 'image', imageUrl: wall.url })}
                      className={`relative aspect-video rounded-lg overflow-hidden border transition-all ${
                        bgState.type === 'image' && bgState.imageUrl === wall.url
                          ? 'border-zinc-950 ring-2 ring-zinc-950/30'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <img src={wall.url} alt={wall.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 text-[9px] font-medium text-white drop-shadow">
                        {wall.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SHADOW & GLOW */}
          {activeTab === 'effects' && (
            <div className="space-y-4 sm:space-y-6 flex-1 overflow-y-auto pr-1">
              
              <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-zinc-950">Subject Drop Shadow</span>
                  <input
                    type="checkbox"
                    checked={shadowState.enabled}
                    onChange={(e) => setShadowState({ ...shadowState, enabled: e.target.checked })}
                    className="w-4 h-4 accent-zinc-950 cursor-pointer"
                  />
                </div>

                {shadowState.enabled && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex justify-between text-xs text-zinc-600 mb-1">
                        <span>Shadow Blur</span>
                        <span className="font-mono-tech text-zinc-950">{shadowState.blur}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={shadowState.blur}
                        onChange={(e) => setShadowState({ ...shadowState, blur: parseInt(e.target.value) })}
                        className="w-full accent-zinc-950 h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-zinc-600 mb-1">
                        <span>Vertical Offset</span>
                        <span className="font-mono-tech text-zinc-950">{shadowState.offsetY}px</span>
                      </div>
                      <input
                        type="range"
                        min="-30"
                        max="50"
                        value={shadowState.offsetY}
                        onChange={(e) => setShadowState({ ...shadowState, offsetY: parseInt(e.target.value) })}
                        className="w-full accent-zinc-950 h-2"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-zinc-950">Sticker White Outline</span>
                  <input
                    type="checkbox"
                    checked={outlineState.enabled}
                    onChange={(e) => setOutlineState({ ...outlineState, enabled: e.target.checked })}
                    className="w-4 h-4 accent-zinc-950 cursor-pointer"
                  />
                </div>

                {outlineState.enabled && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex justify-between text-xs text-zinc-600 mb-1">
                        <span>Outline Thickness</span>
                        <span className="font-mono-tech text-zinc-950">{outlineState.thickness}px</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="30"
                        value={outlineState.thickness}
                        onChange={(e) => setOutlineState({ ...outlineState, thickness: parseInt(e.target.value) })}
                        className="w-full accent-zinc-950 h-2"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: ASPECT RATIO */}
          {activeTab === 'crop' && (
            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              <label className="text-xs font-semibold text-zinc-900 block">
                Preset Aspect Ratios & Re-framing
              </label>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { id: 'original', label: 'Original Ratio' },
                  { id: '1:1', label: '1:1 Square (IG)' },
                  { id: '9:16', label: '9:16 TikTok / Story' },
                  { id: '16:9', label: '16:9 Thumbnail' },
                  { id: '4:5', label: '4:5 Social Portrait' },
                  { id: '3:4', label: '3:4 Passport Avatar' },
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id as AspectRatioType)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all min-h-[44px] ${
                      aspectRatio === ratio.id
                        ? 'bg-zinc-950 text-white border-zinc-950 font-semibold'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
