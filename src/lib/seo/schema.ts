import { SITE_URL } from './canonical';
import { FAQItem, BreadcrumbItem, ContentArticle } from '@/types/content';

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BG Remover',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BG Remover',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    sameAs: [
      'https://github.com/bgremover',
      'https://twitter.com/bgremover',
    ],
  };
}

export function getSoftwareAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BG Remover',
    operatingSystem: 'Any (Web Browser)',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free in-browser AI background remover providing local WebAssembly processing, transparent PNG downloads, SVG vector traces, and studio background replacement.',
  };
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${SITE_URL}${item.item}`,
    })),
  };
}

export function getFaqSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(article: ContentArticle) {
  const isTech = article.category.slug === 'privacy-ai' || article.category.slug === 'image-formats';
  return {
    '@context': 'https://schema.org',
    '@type': isTech ? 'TechArticle' : 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage || `${SITE_URL}/logo.webp`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: `${SITE_URL}/authors/${article.author.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BG Remover',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/learn/${article.slug}`,
    },
  };
}
