import type { Metadata } from 'next';
import { getCanonicalUrl, SITE_URL } from './canonical';

export interface SEOParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  keywords?: string[];
}

export function generateSEO({
  title,
  description,
  path,
  ogImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&h=630&q=80',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
  keywords = [],
}: SEOParams): Metadata {
  const canonical = getCanonicalUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
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
      title,
      description,
      url: canonical,
      siteName: 'BG Remover',
      locale: 'en_US',
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && authors.length > 0 && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@bgremover',
      images: [ogImage],
    },
  };
}
