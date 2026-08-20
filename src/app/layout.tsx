import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { getSoftwareAppSchema } from '@/lib/seo/schema';
import { SITE_URL } from '@/lib/seo/canonical';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BG Remover — Free AI Image & GIF Background Remover Resource Platform',
    template: '%s | BG Remover',
  },
  description:
    'Free AI background remover and educational resource platform. Delete image backgrounds instantly with local WebAssembly privacy, batch processing, and unlimited 4K PNG exports.',
  applicationName: 'BG Remover',
  keywords: [
    'Background Remover',
    'free background remover',
    'image background remover',
    'bulk background remover',
    'transparent PNG maker',
    'remove background from image',
    'background replacer',
  ],
  authors: [{ name: 'BG Remover Team', url: SITE_URL }],
  creator: 'BG Remover Team',
  publisher: 'BG Remover',
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
    title: 'BG Remover — Free AI Image Background Remover Resource Platform',
    description:
      'Delete image backgrounds in-browser with local WebAssembly AI. Unlimited 4K exports, transparent PNG downloads, and technical educational guides.',
    url: SITE_URL,
    siteName: 'BG Remover',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Free AI Background Remover Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BG Remover — Free AI Background Remover & Educational Platform',
    description:
      'Delete photo backgrounds in-browser with WebAssembly AI. Unlimited 4K PNG exports without watermarks.',
    creator: '@bgremover',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const softwareSchema = getSoftwareAppSchema();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#fafafa] text-[#171717] antialiased selection:bg-zinc-950 selection:text-white vercel-mesh-bg bg-grid-pattern">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
