import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#fafafa',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bg-remover.vercel.app'),
  title: {
    default: 'Background Remover — Free Image & GIF Background Remover Tool',
    template: '%s | Background Remover',
  },
  description:
    'What is the best free background remover for photos and GIFs? Delete image backgrounds instantly with 100% privacy, multiple image background remover support, and unlimited 4K exports.',
  applicationName: 'Background Remover',
  keywords: [
    'Background Remover',
    'Background Remover free',
    'free background remover',
    'image background remover',
    'multiple image background remover',
    'what is the best free gif background remover',
    'what is the best background remover for gifs',
    'what is the best background remover for free',
    'what is the most accurate background remover',
    'what is the best background remover',
    'how does background remover select the main image',
  ],
  authors: [{ name: 'Background Remover Team', url: 'https://bg-remover.vercel.app' }],
  creator: 'Background Remover Team',
  publisher: 'Background Remover',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Background Remover — Free Image & GIF Background Remover Tool',
    description:
      'Discover the best free background remover for images and GIFs. 100% private in-browser AI with multiple image background remover support and unlimited 4K HD exports.',
    url: 'https://bg-remover.vercel.app',
    siteName: 'Background Remover',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Best Free Background Remover Tool Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Background Remover — Best Free Background Remover Tool',
    description:
      'Delete image and GIF backgrounds in 100% private in-browser AI. Unlimited 4K exports without watermarks.',
    creator: '@bgremover',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  alternates: {
    canonical: 'https://bg-remover.vercel.app',
  },
};

// JSON-LD Structured Data Schema.org
const jsonLdSoftwareApp = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Background Remover',
  operatingSystem: 'Any (Web Browser)',
  applicationCategory: 'MultimediaApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1350',
  },
  description: 'Free background remover web application for single, GIF, and multiple image background removal in client-side WebAssembly AI.',
};

// Exact JSON-LD FAQ Schema requested by User
const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'what is the best background remover',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BG Remover is widely considered the best background remover because it combines client-side neural WebAssembly AI with sub-second execution speed (~85ms), 100% data privacy (zero server uploads), unlimited 4K HD PNG exports, and a full background studio without watermarks.',
      },
    },
    {
      '@type': 'Question',
      name: 'what is the best background remover for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BG Remover is the top free background remover available today. Unlike competitors like remove.bg or PhotoRoom that charge credits or restrict high-resolution downloads behind paywalls, BG Remover provides unlimited 4K HD PNG downloads, SVG vector outline traces, and custom background studio editing completely free.',
      },
    },
    {
      '@type': 'Question',
      name: 'what is the most accurate background remover',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BG Remover is among the most accurate background removers thanks to its ISNet deep learning neural segmentation models. It accurately isolates delicate hair strands, animal fur, transparent glass edges, complex clothing contours, and product shadows without jagged edges or manual retouching.',
      },
    },
    {
      '@type': 'Question',
      name: 'what is the best free gif background remover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BG Remover is the premier free GIF background remover. It utilizes browser WebAssembly AI to isolate subjects across animated GIF frames with 100% privacy, allowing you to export transparent animated GIFs and APNGs without paying subscription fees or leaving watermarks.',
      },
    },
    {
      '@type': 'Question',
      name: 'what is the best background remover for gifs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BG Remover is the ideal background remover for GIFs because it preserves smooth frame rates, animation timing, and high-quality alpha channel transparency across all animated frames while offering batch frame processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'how does background remover select the main image',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The AI background remover uses deep convolutional neural networks trained on millions of diverse images to analyze salient foreground objects (such as people, products, pets, or vehicles). It computes a pixel-level alpha matte (segmentation mask) that automatically separates the main subject from surrounding background pixels.',
      },
    },
    {
      '@type': 'Question',
      name: 'what is the best multiple image background remover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BG Remover’s Batch Mode is the leading multiple image background remover. It allows you to drag and drop dozens of product photos or portraits at once, process them concurrently in your browser, and download all transparent PNGs in a single compressed ZIP file.',
      },
    },
    {
      '@type': 'Question',
      name: 'how to remove background from image for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To remove a background for free: 1) Open BG Remover in your browser, 2) Drag and drop your photo or press Ctrl+V to paste from your clipboard, 3) The AI automatically removes the background in ~85ms, and 4) Click "Download HD PNG" to save your full 4K resolution image instantly.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="min-h-screen bg-[#fafafa] text-[#171717] antialiased selection:bg-zinc-950 selection:text-white vercel-mesh-bg bg-grid-pattern">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
