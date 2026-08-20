import { ProductPage } from '@/types/content';

export const PRODUCT_PAGES: Record<string, ProductPage> = {
  'background-remover': {
    slug: 'background-remover',
    title: 'Background Remover',
    h1: 'Free AI Background Remover Studio',
    subtitle: 'Isolate subjects instantly with 100% in-browser WebAssembly AI. Export unlimited 4K HD transparent PNGs without paywalls or watermarks.',
    seoTitle: 'Free AI Background Remover Tool: Instant 4K PNG Exports',
    seoDescription: 'Remove backgrounds from images instantly for free. 100% private in-browser AI, unlimited 4K HD downloads, SVG vector outlines, and zero watermarks.',
    features: [
      {
        title: '100% Local Browser Privacy',
        description: 'All AI segmentation operations execute locally in your web browser via WebAssembly with zero cloud server uploads.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Sub-Second Speed',
        description: 'Pre-warmed neural networks process photos in real time using client-side GPU acceleration.',
        icon: 'Zap',
      },
      {
        title: 'Unlimited 4K PNG Exports',
        description: 'Download original camera resolution cutouts without credit limits, subscriptions, or watermarks.',
        icon: 'Sparkles',
      },
      {
        title: 'Pro Studio Backgrounds',
        description: 'Replace backdrops with solid colors, Vercel mesh gradients, bokeh blurs, or custom uploads.',
        icon: 'Layers',
      },
    ],
    contentSections: [
      {
        h2: 'The Premier Free AI Background Remover for Creators & Sellers',
        body: 'Whether you are preparing e-commerce product photos, crafting social media graphics, or designing professional avatars, BG Remover provides instant high-precision background removal directly in your web browser.',
      },
      {
        h2: 'How Modern WebAssembly AI Isolate Subjects',
        body: 'Unlike legacy online editing tools that require uploading sensitive personal photos to remote cloud servers, BG Remover utilizes modern WebAssembly (WASM) neural networks. Your image data never leaves your computer, ensuring total data security.',
      },
    ],
    faqs: [
      {
        question: 'Is this background remover really 100% free?',
        answer: 'Yes. BG Remover provides unlimited 4K HD exports, batch processing, and vector SVG outlines completely free without paywalls or forced registration.',
      },
      {
        question: 'What file formats can I export?',
        answer: 'You can export transparent PNG cutouts, optimized JPG renders, lossy WebP files, and scalable SVG vector outline paths.',
      },
    ],
    updatedAt: '2026-08-18',
  },
  'bulk-background-remover': {
    slug: 'bulk-background-remover',
    title: 'Bulk Background Remover',
    h1: 'Multiple Image Bulk Background Remover',
    subtitle: 'Process dozens of product photos or portraits concurrently in your browser. Download all transparent PNGs in a single 1-click ZIP archive.',
    seoTitle: 'Bulk Background Remover: Process Multiple Images at Once',
    seoDescription: 'Remove backgrounds from multiple images concurrently for free. Drag and drop product photo batches and export transparent PNGs in a 1-click ZIP archive.',
    features: [
      {
        title: 'Concurrent Batch Execution',
        description: 'Process 50+ SKU photos simultaneously using local multithreaded browser workers.',
        icon: 'Layers',
      },
      {
        title: '1-Click ZIP Archive Export',
        description: 'Package all completed transparent PNG cutouts into a compressed ZIP file with one click.',
        icon: 'Sparkles',
      },
      {
        title: 'Zero Upload Limits',
        description: 'No per-image credit charges or monthly subscription tier lockouts.',
        icon: 'Zap',
      },
    ],
    contentSections: [
      {
        h2: 'Efficient Bulk Background Removal for E-Commerce Stores',
        body: 'Managing catalog photography for dozens of products can take hours. Our Bulk Background Remover handles concurrent image segmentation in local browser memory, saving e-commerce merchants significant manual labor.',
      },
    ],
    faqs: [
      {
        question: 'How many photos can I process at once in batch mode?',
        answer: 'You can process dozens of photos concurrently depending on your computer system memory. All processing runs locally in your browser.',
      },
    ],
    updatedAt: '2026-08-18',
  },
  'transparent-background-maker': {
    slug: 'transparent-background-maker',
    title: 'Transparent Background Maker',
    h1: 'Transparent Background Maker for PNGs & Logos',
    subtitle: 'Turn any photo, logo, or graphic into a clean transparent PNG asset with 8-bit alpha transparency.',
    seoTitle: 'Transparent Background Maker: Create Transparent PNGs Free',
    seoDescription: 'Create transparent background PNG images online for free. Instantly convert photo backgrounds to transparent checkerboards with high-precision AI.',
    features: [
      {
        title: 'Alpha Channel Preservation',
        description: 'Exports true 8-bit alpha channels for smooth semi-transparent edges and drop shadows.',
        icon: 'Sparkles',
      },
      {
        title: 'Vector SVG Silhouette Output',
        description: 'Generates scalable XML vector outline paths for sticker cutouts and laser plotters.',
        icon: 'Layers',
      },
    ],
    contentSections: [
      {
        h2: 'Create Transparent PNG Assets for Design Projects',
        body: 'A transparent background allows logos and graphics to overlay seamlessly above website headers and promotional banners without white rectangular borders.',
      },
    ],
    faqs: [
      {
        question: 'Can I make logo backgrounds transparent?',
        answer: 'Yes. Simply upload your logo image to strip away solid white or black background boxes.',
      },
    ],
    updatedAt: '2026-08-18',
  },
  'background-replacer': {
    slug: 'background-replacer',
    title: 'Background Replacer',
    h1: 'AI Background Replacer & Studio Editor',
    subtitle: 'Replace photo backdrops with solid studio colors, professional gradients, blurred bokeh scenes, or custom images.',
    seoTitle: 'AI Background Replacer: Change Photo Backdrops Online',
    seoDescription: 'Replace photo backgrounds online for free. Swap backdrops with studio color palettes, Vercel mesh gradients, bokeh blurs, or custom background photos.',
    features: [
      {
        title: 'Custom Studio Color Palettes',
        description: 'Choose from curated HSL color swatches, executive grey gradients, or custom HEX codes.',
        icon: 'Sparkles',
      },
      {
        title: 'Gaussian Bokeh Blur',
        description: 'Apply realistic depth-of-field blur to original photo backgrounds.',
        icon: 'Layers',
      },
    ],
    contentSections: [
      {
        h2: 'Swap Backgrounds with Real-Time Studio Controls',
        body: 'Transform casual snapshots into polished studio graphics by replacing backdrops with modern mesh gradients, drop shadows, and brightness controls.',
      },
    ],
    faqs: [
      {
        question: 'Can I upload my own custom background image?',
        answer: 'Yes. In the Studio Editor, select the Image backdrop mode and upload any custom background photo.',
      },
    ],
    updatedAt: '2026-08-18',
  },
  'image-cutout-tool': {
    slug: 'image-cutout-tool',
    title: 'Image Cutout Tool',
    h1: 'Precision AI Image Cutout Tool',
    subtitle: 'Extract subjects with sub-pixel edge matting, flyaway hair strand protection, and custom sticker glows.',
    seoTitle: 'Precision Image Cutout Tool: Extract Photo Subjects',
    seoDescription: 'Extract precise photo cutouts online for free. Advanced AI matting preserves fine hair strands, pet fur, and delicate contours with zero watermarks.',
    features: [
      {
        title: 'Sub-Pixel Edge Matting',
        description: 'Preserves hair strands, mesh textures, and delicate transparent boundaries.',
        icon: 'Zap',
      },
      {
        title: 'Sticker Glow Effect',
        description: 'Add thick white or custom color outline strokes around subject cutouts.',
        icon: 'Sparkles',
      },
    ],
    contentSections: [
      {
        h2: 'High-Precision Subject Extraction for Designers',
        body: 'Extract clean subject cutouts without jagged edges using our advanced neural matting pipeline.',
      },
    ],
    faqs: [
      {
        question: 'How do I add a sticker outline to my cutout?',
        answer: 'Toggle the "Sticker Outline" option in the Studio workspace and adjust thickness and stroke color.',
      },
    ],
    updatedAt: '2026-08-18',
  },
  'remove-background-from-image': {
    slug: 'remove-background-from-image',
    title: 'Remove Background From Image',
    h1: 'Remove Background From Image Online Free',
    subtitle: 'The fastest, 100% private in-browser AI tool to delete backgrounds from photos and graphics.',
    seoTitle: 'Remove Background From Image Online Free — BG Remover',
    seoDescription: 'Remove background from image online for free in 1-click. 100% private client-side AI, zero account signups, and unlimited 4K HD exports.',
    features: [
      {
        title: '1-Click Instant AI Delete',
        description: 'Drag & drop or press Ctrl+V to strip backgrounds instantly in your web browser.',
        icon: 'Zap',
      },
      {
        title: 'No Account Required',
        description: 'Start using immediately without mandatory login forms or email signups.',
        icon: 'ShieldCheck',
      },
    ],
    contentSections: [
      {
        h2: 'Delete Photo Backgrounds in 1-Click',
        body: 'Strip unwanted backgrounds instantly without spending money on expensive photo editing subscriptions.',
      },
    ],
    faqs: [
      {
        question: 'Do I need to install any browser extensions or software?',
        answer: 'No. BG Remover runs directly in any modern desktop or mobile web browser.',
      },
    ],
    updatedAt: '2026-08-18',
  },
};
