export type BackgroundType = 'transparent' | 'color' | 'gradient' | 'blur' | 'image';

export interface BackgroundState {
  type: BackgroundType;
  color: string;
  gradient: string;
  blurAmount: number; // 0 to 50px
  imageUrl?: string;
}

export interface ShadowState {
  enabled: boolean;
  color: string;
  blur: number; // 0 to 40
  offsetX: number; // -50 to 50
  offsetY: number; // -50 to 50
  opacity: number; // 0 to 1
}

export interface StickerOutlineState {
  enabled: boolean;
  color: string;
  thickness: number; // 1 to 30
  blur: number; // 0 to 20
}

export interface AdjustmentsState {
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  feathering: number; // 0 to 10
}

export type AspectRatioType = 'original' | '1:1' | '9:16' | '16:9' | '4:5' | '3:4';

export interface ProcessedImageResult {
  originalUrl: string;
  fgImageUrl: string; // Foregound image with transparent background (Data URL or Blob URL)
  processedUrl: string; // Composite final rendered image
  originalWidth: number;
  originalHeight: number;
  processingTimeMs: number;
  fileName: string;
  fileSizeFormatted: string;
}

export interface SampleImage {
  id: string;
  title: string;
  category: 'Portrait' | 'Product' | 'Animal' | 'Vehicle' | 'Graphic';
  url: string;
  thumb: string;
}
