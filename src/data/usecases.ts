import { UseCase } from '@/types/content';

export const USE_CASES: Record<string, UseCase> = {
  'ecommerce': {
    slug: 'ecommerce',
    title: 'Background Removal for E-Commerce & Product Catalogs',
    shortDescription: 'Standardize product catalog photography, prepare white-background compliance shots for Amazon and Shopify, and boost sales conversions.',
    fullWorkflow: `
### E-Commerce Photography Workflow
1. **Bulk Upload**: Drag and drop 50+ raw product SKU shots into the [Bulk Background Remover](/bulk-background-remover).
2. **Automated AI Extraction**: In-browser neural networks isolate products concurrently across all images.
3. **Standardize Studio Backdrop**: Apply pure white (\`#FFFFFF\`) or subtle off-white backdrops to match store guidelines.
4. **Export 1-Click ZIP Archive**: Download all processed product cutouts instantly in compressed ZIP format.
`,
    targetAudience: 'Shopify merchants, Amazon sellers, eBay store owners, and e-commerce digital catalog managers.',
    keyBenefits: [
      'Increases buyer trust with consistent white-background product catalogs',
      'Meets Amazon, Google Shopping, and eBay main listing requirements',
      'Processes dozens of product photos concurrently via local browser batch mode',
      'Saves hours of manual pen-tool masking work',
    ],
    recommendedFormats: ['PNG-32 (Master)', 'WebP (Production Web)'],
    limitations: [
      'Extremely reflective silver or mirror products may require subtle manual edge shadow tuning.',
    ],
    faqs: [
      {
        question: 'Does Amazon require white backgrounds for product listings?',
        answer: 'Yes, Amazon strictly requires the main listing image to feature a pure white (#FFFFFF) background with the product occupying 85% of the frame.',
      },
    ],
    seoTitle: 'E-Commerce Background Removal Workflow: Shopify & Amazon Photos',
    seoDescription: 'Complete e-commerce product photo background removal workflow. Standardize Shopify catalogs, fulfill Amazon white-background rules, and process bulk SKUs.',
    updatedAt: '2026-08-16',
    toolCtaPath: '/bulk-background-remover',
    toolCtaText: 'Open Bulk Product Remover',
  },
  'product-photography': {
    slug: 'product-photography',
    title: 'Background Removal for Product Photography & Catalogs',
    shortDescription: 'Isolate commercial products, eliminate unwanted reflections, and generate transparent PNG cutouts with realistic drop shadows.',
    fullWorkflow: `
### Product Photography Isolation Workflow
1. **Capture & Upload**: Upload high-resolution product photos taken under studio light.
2. **AI Boundary Masking**: Neural networks separate product contours, fine straps, and edges.
3. **Studio Shadow Rendering**: Add soft contact drop shadows to prevent products from looking floaty.
4. **Full HD 4K Export**: Export uncompressed 4K resolution PNGs without paywalls or watermarks.
`,
    targetAudience: 'Commercial photographers, studio lighting technicians, and product catalog retouchers.',
    keyBenefits: [
      'Preserves sharp product contours and fine specular highlights',
      'Generates scalable vector SVG silhouettes for print packaging',
      'Provides full 4K HD resolution exports without watermarks',
    ],
    recommendedFormats: ['PNG-32', 'SVG Vector Silhouette'],
    limitations: [
      'Ensure source photos have clear edge contrast against studio backdrops.',
    ],
    faqs: [
      {
        question: 'Can I generate vector outlines of product cutouts?',
        answer: 'Yes, BG Remover can export scalable SVG vector outline paths suitable for laser cutting, sticker dies, and packaging layouts.',
      },
    ],
    seoTitle: 'Product Photography Background Removal: Studio Cutouts & Shadows',
    seoDescription: 'Professional product photography background removal guide. Learn how to extract sharp product cutouts, render realistic shadows, and export 4K PNGs.',
    updatedAt: '2026-08-16',
    toolCtaPath: '/background-remover',
    toolCtaText: 'Start Product Cutout Studio',
  },
  'social-media': {
    slug: 'social-media',
    title: 'Background Removal for Social Media & YouTube Thumbnails',
    shortDescription: 'Create high-CTR YouTube thumbnails, Instagram cutouts, TikTok stickers, and eye-catching promotional banners.',
    fullWorkflow: `
### Thumbnail & Social Media Cutout Workflow
1. **Upload Selfie or Pose Shot**: Drop your high-energy portrait photo into [BG Remover](/background-remover).
2. **Sticker Outline Glow**: Turn on the **Sticker Outline** effect in Studio Editor to add a thick bold stroke around your avatar.
3. **Aspect Ratio Crop**: Select YouTube (16:9) or Instagram Story (9:16) aspect ratio canvas.
4. **Export PNG Cutout**: Download your vibrant thumbnail subject cutout.
`,
    targetAudience: 'YouTube creators, social media managers, TikTok influencers, and digital marketers.',
    keyBenefits: [
      'Creates bold white or colored sticker outline strokes around subjects',
      'Presets for 16:9 YouTube thumbnails and 9:16 vertical stories',
      'Instant in-browser processing for rapid content publishing',
    ],
    recommendedFormats: ['PNG-32', 'JPG Studio Render'],
    limitations: [],
    faqs: [
      {
        question: 'How do I add a white outline border around my cutout for YouTube thumbnails?',
        answer: 'In BG Remover Studio Editor, enable the "Sticker Outline" toggle, set thickness to 12px, and choose white (#FFFFFF) as your outline color.',
      },
    ],
    seoTitle: 'Social Media & YouTube Thumbnail Background Removal Studio',
    seoDescription: 'Create high-converting YouTube thumbnail cutouts, sticker outline glows, and social media portrait graphics with instant AI background removal.',
    updatedAt: '2026-08-17',
    toolCtaPath: '/background-remover',
    toolCtaText: 'Create Thumbnail Cutout',
  },
  'profile-photos': {
    slug: 'profile-photos',
    title: 'Background Removal for Professional Headshots & Avatars',
    shortDescription: 'Replace messy home office backgrounds with clean, professional corporate gradients and blurred studio backdrops for LinkedIn and resumes.',
    fullWorkflow: `
### Professional Headshot Workflow
1. **Upload Headshot**: Select your casual portrait photo.
2. **AI Hair Edge Refinement**: Neural segmentation preserves flyaway hair and collar contours.
3. **Corporate Backdrop Swap**: Choose a modern studio grey gradient or blurred office backdrop.
4. **1:1 Avatar Crop**: Crop to square 1:1 ratio ideal for LinkedIn and corporate team pages.
`,
    targetAudience: 'Job applicants, corporate team managers, recruiters, and LinkedIn professionals.',
    keyBenefits: [
      'Replaces distracting bedroom/living room backgrounds with executive studio gradients',
      'Preserves natural hair detail without artificial helmet edges',
      '100% private client-side processing protects personal facial photos',
    ],
    recommendedFormats: ['PNG-32', 'JPG Corporate Render'],
    limitations: [],
    faqs: [
      {
        question: 'Is my personal headshot uploaded to a server?',
        answer: 'No. BG Remover runs 100% in your local browser WebAssembly sandbox. Zero bytes of your headshots are transmitted to external servers.',
      },
    ],
    seoTitle: 'Professional Headshot Background Removal: LinkedIn & Resume Photos',
    seoDescription: 'Transform casual photos into executive corporate headshots. Replace messy backgrounds with clean professional gradients while preserving natural hair.',
    updatedAt: '2026-08-18',
    toolCtaPath: '/background-remover',
    toolCtaText: 'Transform Headshot Now',
  },
  'graphic-design': {
    slug: 'graphic-design',
    title: 'Background Removal for Graphic Design & Sticker Cutouts',
    shortDescription: 'Extract design assets, generate scalable SVG vector silhouettes, create transparent logo cutouts, and prepare print-ready graphics.',
    fullWorkflow: `
### Graphic Design Asset Workflow
1. **Upload Logo or Graphic**: Drop raster artwork or photo graphics into the editor.
2. **Transparent PNG Extraction**: Remove white backgrounds from scanned hand drawings or logos.
3. **SVG Vector Trace**: Generate clean vector bounding paths for vinyl plotters and laser cutters.
4. **Export Master Assets**: Download full HD PNG and SVG files.
`,
    targetAudience: 'Graphic designers, print shop operators, sticker manufacturers, and visual artists.',
    keyBenefits: [
      'Generates scalable vector SVG silhouette paths for laser cutters and plotters',
      'Removes unwanted white backdrops from raster logos and illustrations',
      'Preserves original color fidelity without compression degradation',
    ],
    recommendedFormats: ['PNG-32', 'SVG Vector Silhouette'],
    limitations: [],
    faqs: [
      {
        question: 'Can I export vector files from my photo cutouts?',
        answer: 'Yes, BG Remover includes an automated SVG Vector Trace engine that outputs clean XML vector paths for vinyl cutting and printing.',
      },
    ],
    seoTitle: 'Graphic Design Background Removal & SVG Vector Cutout Studio',
    seoDescription: 'Extract design elements, create transparent logo cutouts, and generate scalable SVG vector outline paths for graphic designers and print shops.',
    updatedAt: '2026-08-18',
    toolCtaPath: '/transparent-background-maker',
    toolCtaText: 'Open Design Cutout Studio',
  },
};
