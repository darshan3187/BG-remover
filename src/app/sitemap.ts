import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/canonical';
import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { GLOSSARY_TERMS } from '@/data/glossary';
import { USE_CASES } from '@/data/usecases';
import { PRODUCT_PAGES } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Root & Core Product Pages
  routes.push({
    url: SITE_URL,
    lastModified: new Date('2026-08-18'),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  Object.keys(PRODUCT_PAGES).forEach((slug) => {
    routes.push({
      url: `${SITE_URL}/${slug}`,
      lastModified: new Date(PRODUCT_PAGES[slug].updatedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // 2. Educational Hub & Articles
  routes.push({
    url: `${SITE_URL}/learn`,
    lastModified: new Date('2026-08-18'),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  ARTICLES.forEach((article) => {
    routes.push({
      url: `${SITE_URL}/learn/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // 3. Categories
  Object.values(CATEGORIES).forEach((cat) => {
    routes.push({
      url: `${SITE_URL}/learn/category/${cat.slug}`,
      lastModified: new Date('2026-08-15'),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // 4. Glossary
  routes.push({
    url: `${SITE_URL}/learn/glossary`,
    lastModified: new Date('2026-08-15'),
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  Object.values(GLOSSARY_TERMS).forEach((term) => {
    routes.push({
      url: `${SITE_URL}/learn/glossary/${term.slug}`,
      lastModified: new Date(term.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // 5. Use Cases
  routes.push({
    url: `${SITE_URL}/use-cases`,
    lastModified: new Date('2026-08-15'),
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  Object.values(USE_CASES).forEach((uc) => {
    routes.push({
      url: `${SITE_URL}/use-cases/${uc.slug}`,
      lastModified: new Date(uc.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // 6. Static Trust Pages
  ['/about', '/privacy', '/terms', '/contact'].forEach((path) => {
    routes.push({
      url: `${SITE_URL}${path}`,
      lastModified: new Date('2026-08-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return routes;
}
