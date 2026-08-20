import React from 'react';
import type { Metadata } from 'next';
import { PRODUCT_PAGES } from '@/data/products';
import { generateSEO } from '@/lib/seo/metadata';
import { getSoftwareAppSchema, getFaqSchema } from '@/lib/seo/schema';
import Home from '@/app/page';

const productData = PRODUCT_PAGES['background-replacer'];

export const metadata: Metadata = generateSEO({
  title: productData.seoTitle,
  description: productData.seoDescription,
  path: `/background-replacer`,
});

export default function BackgroundReplacerPage() {
  const softwareSchema = getSoftwareAppSchema();
  const faqSchema = getFaqSchema(productData.faqs);

  return (
    <div>
      {softwareSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Home />
    </div>
  );
}
