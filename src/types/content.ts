export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    x?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich HTML
  category: Category;
  tags: Tag[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  featuredImage?: string;
  featuredImageAlt?: string;
  canonicalUrl?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faqs?: FAQItem[];
  relatedArticles?: string[]; // Article slugs
  relatedTools?: string[]; // Tool paths like '/bulk-background-remover'
  status: 'draft' | 'published';
  noIndex?: boolean;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  fullExplanation: string;
  category: string;
  relatedTerms?: string[];
  relatedArticles?: string[];
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

export interface UseCase {
  slug: string;
  title: string;
  shortDescription: string;
  fullWorkflow: string;
  targetAudience: string;
  keyBenefits: string[];
  recommendedFormats: string[];
  limitations: string[];
  faqs: FAQItem[];
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
  toolCtaPath: string;
  toolCtaText: string;
}

export interface ProductPage {
  slug: string;
  title: string;
  h1: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  features: { title: string; description: string; icon: string }[];
  contentSections: { h2: string; body: string }[];
  faqs: FAQItem[];
  updatedAt: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}
