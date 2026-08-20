import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PRODUCT_PAGES } from '@/data/products';
import { generateSEO } from '@/lib/seo/metadata';
import { getSoftwareAppSchema, getFaqSchema } from '@/lib/seo/schema';
import { ShieldCheck, Zap, Sparkles, Layers, HelpCircle } from 'lucide-react';
import Home from '@/app/page';

const productData = PRODUCT_PAGES['background-remover'];

export const metadata: Metadata = generateSEO({
  title: productData.seoTitle,
  description: productData.seoDescription,
  path: `/background-remover`,
});

export default function BackgroundRemoverProductPage() {
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

      {/* Render core tool application */}
      <Home />
    </div>
  );
}
