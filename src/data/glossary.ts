import { GlossaryTerm } from '@/types/content';

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  'alpha-channel': {
    slug: 'alpha-channel',
    term: 'Alpha Channel',
    definition: 'A color channel that specifies pixel opacity in digital images, allowing values from 0 (completely transparent) to 255 (completely opaque).',
    fullExplanation: `
An **Alpha Channel** is an additional 8-bit channel in 32-bit digital graphics that encodes pixel transparency alongside standard Red, Green, and Blue (RGB) color channels.

### Technical Details
* **0 (0x00)**: Completely invisible / 100% transparent.
* **255 (0xFF)**: Completely opaque / 100% visible.
* **1 to 254**: Semi-transparent translucency essential for anti-aliased hair edges, glass reflections, and drop shadows.

Alpha transparency enables digital assets to overlay seamlessly above any background canvas without square border artifacts.
`,
    category: 'Computer Vision & Formats',
    relatedTerms: ['png', 'transparent-background', 'image-matting'],
    relatedArticles: ['png-vs-jpg-transparent-background', 'how-to-create-transparent-png'],
    seoTitle: 'Alpha Channel Defined: Image Transparency & Opacity Guide',
    seoDescription: 'What is an Alpha Channel? Learn how 8-bit alpha channels specify pixel opacity, translucency, and transparency in PNG and WebP files.',
    updatedAt: '2026-08-15',
  },
  'image-segmentation': {
    slug: 'image-segmentation',
    term: 'Image Segmentation',
    definition: 'A computer vision process of partitioning a digital image into multiple pixel regions based on semantic category or object boundary.',
    fullExplanation: `
**Image Segmentation** is a foundational deep learning task in computer vision where algorithms classify every individual pixel in a digital photograph.

### Types of Segmentation
1. **Semantic Segmentation**: Groups all pixels of a class (e.g. "person") under a single label.
2. **Instance Segmentation**: Differentiates between individual instances of an object (e.g. Person 1 vs Person 2).
3. **Dichotomous Segmentation**: Separates primary salient foreground objects from background elements for instant cutout extraction.
`,
    category: 'AI & Neural Networks',
    relatedTerms: ['image-matting', 'onnx'],
    relatedArticles: ['what-is-image-segmentation', 'how-ai-background-removal-works'],
    seoTitle: 'Image Segmentation Definition: Computer Vision Explained',
    seoDescription: 'Learn what image segmentation is in computer vision. Covers semantic segmentation, instance segmentation, and deep learning cutout extraction.',
    updatedAt: '2026-08-15',
  },
  'image-matting': {
    slug: 'image-matting',
    term: 'Image Matting',
    definition: 'The process of calculating precise fractional alpha opacity values for fine structural features like hair strands, fur, and glass reflections.',
    fullExplanation: `
Unlike basic binary pixel clipping (which forces pixels to be either strictly 100% black or 100% white), **Image Matting** solves the composite opacity equation for semi-transparent boundaries:

$$I = \\alpha F + (1 - \\alpha) B$$

Matting enables background removers to isolate soft hair strands, smoke, mesh fabrics, and glass without leaving dark fringe halos or jagged edges.
`,
    category: 'Computer Vision & Algorithms',
    relatedTerms: ['alpha-channel', 'image-segmentation'],
    relatedArticles: ['fix-hair-and-fine-edges-background-removal', 'how-ai-background-removal-works'],
    seoTitle: 'Image Matting Defined: Fractional Opacity & Hair Extraction',
    seoDescription: 'What is image matting? Discover how image matting computes fractional alpha values to preserve flyaway hair, translucent glass, and soft edges.',
    updatedAt: '2026-08-16',
  },
  'png': {
    slug: 'png',
    term: 'PNG (Portable Network Graphics)',
    definition: 'A raster graphics file format that supports lossless data compression and full 8-bit alpha channel transparency.',
    fullExplanation: `
**PNG (Portable Network Graphics)** is the universal standard format for transparent digital cutouts. Designed as an unpatented replacement for GIF, PNG-32 stores 24-bit RGB color alongside an 8-bit Alpha channel.

### Key Characteristics
* **Lossless Compression**: Deflate algorithm preserves exact pixel clarity.
* **Full Alpha Support**: Supports $256\\text{ levels of opacity}$.
* **No Compression Artifacts**: Ideal for logos, text, cutouts, and technical illustrations.
`,
    category: 'Image Formats',
    relatedTerms: ['alpha-channel', 'webp', 'transparent-background'],
    relatedArticles: ['png-vs-jpg-transparent-background', 'how-to-create-transparent-png'],
    seoTitle: 'PNG Format Explained: Features, Alpha Channel & Compression',
    seoDescription: 'Complete guide to the PNG file format. Learn how PNG-32 stores lossless alpha transparency for digital graphics and background removal cutouts.',
    updatedAt: '2026-08-16',
  },
  'webp': {
    slug: 'webp',
    term: 'WebP',
    definition: 'A modern image format developed by Google offering superior lossy and lossless compression for web images with alpha transparency.',
    fullExplanation: `
**WebP** is a web-optimized image format designed to reduce file sizes without sacrificing quality. WebP supports both lossy and lossless compression **alongside full alpha channel transparency**.

WebP transparent cutouts are typically **25% to 35% smaller** than equivalent PNG files, making WebP the ideal production format for e-commerce storefronts.
`,
    category: 'Image Formats',
    relatedTerms: ['png', 'alpha-channel'],
    relatedArticles: ['png-vs-jpg-transparent-background', 'product-image-optimization-guide'],
    seoTitle: 'WebP Image Format: Web Transparency & Compression Guide',
    seoDescription: 'Learn about WebP image format. Explains WebP transparency, file size compression savings, and e-commerce web performance advantages.',
    updatedAt: '2026-08-17',
  },
  'onnx': {
    slug: 'onnx',
    term: 'ONNX (Open Neural Network Exchange)',
    definition: 'An open format built to represent machine learning models, enabling model interoperability between PyTorch, TensorFlow, and browser runtimes.',
    fullExplanation: `
**ONNX (Open Neural Network Exchange)** provides an open-source format for AI models. In web applications, ONNX Runtime Web allows neural networks trained in PyTorch or TensorFlow to run directly inside client web browsers using WebAssembly and WebGL.
`,
    category: 'AI & Engineering',
    relatedTerms: ['webassembly', 'image-segmentation'],
    relatedArticles: ['webassembly-ai-explained', 'how-ai-background-removal-works'],
    seoTitle: 'ONNX Runtimes Defined: Machine Learning Model Interoperability',
    seoDescription: 'What is ONNX? Learn how Open Neural Network Exchange standards enable browser-based AI inference via ONNX Runtime Web.',
    updatedAt: '2026-08-17',
  },
  'webassembly': {
    slug: 'webassembly',
    term: 'WebAssembly (WASM)',
    definition: 'A low-level binary instruction format for web browsers enabling high-performance, near-native execution of code written in C, C++, and Rust.',
    fullExplanation: `
**WebAssembly (WASM)** is a web standard that allows heavy computational tasks—such as AI neural network inference and image canvas matrix math—to run directly inside web browsers at native execution speeds with 100% data privacy.
`,
    category: 'AI & Engineering',
    relatedTerms: ['onnx', 'image-segmentation'],
    relatedArticles: ['webassembly-ai-explained', 'client-side-vs-server-side-image-processing'],
    seoTitle: 'WebAssembly (WASM) Explained: In-Browser Native Performance',
    seoDescription: 'Discover how WebAssembly (WASM) enables near-native binary code execution in web browsers for fast, 100% private AI background removal.',
    updatedAt: '2026-08-18',
  },
  'transparent-background': {
    slug: 'transparent-background',
    term: 'Transparent Background',
    definition: 'An image canvas state where scene backdrop pixels are removed, represented visually by a grey-and-white checkerboard pattern.',
    fullExplanation: `
A **Transparent Background** indicates that an image file contains an active Alpha channel with zero-opacity pixels around the primary subject cutout. This allows the image to be placed seamlessly onto any website, document, or graphic composition without background box artifacts.
`,
    category: 'Design & Graphics',
    relatedTerms: ['alpha-channel', 'png'],
    relatedArticles: ['how-to-create-transparent-png', 'how-to-remove-image-background'],
    seoTitle: 'Transparent Background Definition: Checkerboard Canvas Explained',
    seoDescription: 'What is a transparent background? Learn how transparent backgrounds work in digital design and how to export transparent PNG cutouts.',
    updatedAt: '2026-08-18',
  },
};
