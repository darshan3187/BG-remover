# BG Remover — 100% Private, Client-Side AI Background Removal Studio

<p align="center">
  <img src="public/logo.webp" alt="BG Remover Logo" width="120" height="120" />
</p>

<p align="center">
  <strong>Next-Generation WebAssembly AI Background Remover & Pro Studio Editor</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/WebAssembly-WASM_AI-654FF0?style=for-the-badge&logo=webassembly" alt="WebAssembly AI" />
  <img src="https://img.shields.io/badge/Python-FastAPI-009688?style=for-the-badge&logo=fastapi" alt="FastAPI Microservice" />
</p>

---

## 🌟 Overview

**BG Remover** is a high-precision, production-ready AI background removal studio and bulk editing suite built with Next.js 16, React 19, TypeScript, and Tailwind CSS. 

Unlike traditional cloud-based background removers that mandate subscriptions, inject watermarks, or upload user photos to remote servers, **BG Remover runs 100% locally in your web browser via WebAssembly (WASM)**.

It delivers sub-second (~85ms average) AI subject isolation, 4K HD transparent PNG exports, SVG vector outline traces, and a full-featured studio editor — completely free and 100% private.

---

## ✨ Key Features

### 🔒 100% Private On-Device WASM AI
- **Zero Server Uploads**: All neural network segmentations execute locally within your browser's WebAssembly sandbox.
- **Data Security**: Photos and corporate assets never leave your machine memory.

### 🎨 Pro Background Studio Editor
- **Before/After Split Slider**: Interactive comparison slider with full touch support for mobile devices.
- **Custom Backdrops**: Swap backgrounds to transparent, solid colors, Vercel monochrome gradients, bokeh blur, or HD stock wallpapers.
- **Studio Effects**: Add soft drop shadows with customizable blur/offsets or sticker-style white outlines/glows.
- **Preset Re-framing**: Crop to popular aspect ratios (`1:1` Instagram, `9:16` TikTok/Story, `16:9` Thumbnail, `4:5` Portrait, `3:4` Avatar).

### 📦 Bulk Batch Processing
- **Multiple Image Remover**: Drag and drop dozens of product catalog images or portrait photos.
- **Concurrent WASM Execution**: Processes multiple files in parallel right in your browser.
- **1-Click ZIP Export**: Download all transparent PNG cutouts in a single compressed ZIP file.

### ⚡ Hybrid AI Architecture (Client WASM + SOTA Server Microservice)
- **Primary / Fallback Engine**: Attempts connection to a Python FastAPI microservice powered by **BRIA RMBG-2.0 / BiRefNet** (1.2B Parameter Transformer Backbone).
- **Graceful Client WASM Fallback**: If the backend microservice is offline, the app seamlessly falls back to the client-side `@imgly/background-removal` (ISNet FP16) WASM model without downtime.

### 📐 SVG Vector Outline Silhouette Trace
- Generates scalable **SVG vector outline paths** for laser cutting, vinyl printing, vector graphic design, and sticker manufacturing.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | High-performance React 19 framework |
| **Language** | TypeScript | Strict type safety and clear domain models |
| **Styling** | Tailwind CSS | Modern, responsive Vercel-inspired dark/light aesthetic |
| **Icons** | Lucide React | Sleek, consistent icon set |
| **Client AI** | `@imgly/background-removal` | ISNet FP16 WebAssembly & ONNX runtime |
| **Backend AI** | Python FastAPI + PyTorch | BRIA RMBG-2.0 / BiRefNet microservice |
| **Utilities** | JSZip & Canvas-Confetti | Bulk ZIP exports & user achievement celebrations |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Python**: 3.10+ (Optional, for Python AI microservice backend)

---

### 1. Frontend Setup (Next.js Application)

```bash
# Clone the repository
git clone https://github.com/your-username/bg-remover.git
cd bg-remover

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 2. Python AI Microservice Setup (Optional Backend)

For ultra-high-precision server-side background removal (BRIA RMBG-2.0 / BiRefNet):

```bash
# Navigate to server directory
cd server

# Create and activate Python virtual environment
python -m venv venv

# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Start FastAPI microservice
python app.py
```

The AI microservice will start on `http://127.0.0.1:8000`.

---

### 3. Docker Deployment (Python Microservice)

```bash
cd server

# Build Docker container image
docker build -t bria-rmbg-service .

# Run container with GPU acceleration
docker run -d --gpus all -p 8000:8000 bria-rmbg-service
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# URL for the Python AI Microservice (Optional)
# If offline, the client automatically falls back to WASM AI
AI_SERVICE_URL=http://127.0.0.1:8000/remove-bg
```

---

## 📁 Directory Structure

```
BG_REMOVER/
├── public/                 # Static public assets & logos
│   └── logo.webp           # WebP Brand Logo
├── server/                 # Python FastAPI AI Microservice
│   ├── app.py              # FastAPI server entry point
│   ├── inference.py        # BRIA RMBG-2.0 / BiRefNet vision engine
│   ├── Dockerfile          # GPU Docker deployment configuration
│   └── requirements.txt    # Python PyTorch & FastAPI dependencies
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── about/          # About Us & Mission page
│   │   ├── api/remove-bg/  # Server route handler bridge
│   │   ├── contact/        # Contact form page
│   │   ├── privacy/        # 100% Privacy Policy page
│   │   ├── terms/          # Terms & Conditions page
│   │   ├── layout.tsx      # Root layout & SEO metadata
│   │   ├── page.tsx        # Main Studio & Uploader home page
│   │   ├── robots.ts       # SEO robots configuration
│   │   └── sitemap.ts      # Dynamic sitemap generator
│   ├── components/         # React 19 UI components
│   │   ├── BatchProcessor.tsx       # Bulk multi-image processor & ZIP generator
│   │   ├── CompetitorComparison.tsx # Feature comparison matrix
│   │   ├── DynamicLoadingState.tsx  # Animated WASM loading indicator
│   │   ├── EditorStudio.tsx         # Pro Studio editor & split-slider
│   │   ├── FAQSection.tsx           # Accordion FAQ section
│   │   ├── Footer.tsx               # Site footer navigation
│   │   ├── Header.tsx               # Header bar & mode switcher
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── SEOContentSection.tsx    # On-page SEO guide
│   │   └── Uploader.tsx             # Drag-and-drop & paste upload zone
│   ├── types/               # TypeScript interfaces & state schemas
│   └── utils/               # Image engine & WASM computer vision pipeline
│       └── imageEngine.ts   # Edge matting, hole-closing & composite engine
├── next.config.mjs          # Next.js configuration
├── package.json             # NPM dependencies & build scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

---

## 📜 Available Scripts

- `npm run dev` — Starts the Next.js development server
- `npm run build` — Compiles optimized production build
- `npm run start` — Runs the compiled production server
- `npm run lint` — Runs Next.js ESLint checks

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Free for personal, commercial, and educational use.
