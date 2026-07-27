import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js API Route: High-Precision Background Removal Bridge
 * Forwards requests to the Python FastAPI AI Microservice (BRIA RMBG-2.0 / BiRefNet)
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') || formData.get('image');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'No valid image file provided' },
        { status: 400 }
      );
    }

    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000/remove-bg';

    // Prepare FormData payload for FastAPI microservice
    const forwardFormData = new FormData();
    forwardFormData.append('file', file, (file as File).name || 'input.png');

    // Forward to Python AI microservice with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const aiResponse = await fetch(aiServiceUrl, {
      method: 'POST',
      body: forwardFormData,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.warn('AI Service Error:', errorText);
      return NextResponse.json(
        { error: 'AI microservice error', details: errorText },
        { status: 502 }
      );
    }

    const pngBuffer = await aiResponse.arrayBuffer();

    return new NextResponse(Buffer.from(pngBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-AI-Engine': 'BRIA-RMBG-2.0-BiRefNet',
      },
    });

  } catch (error: any) {
    console.warn('API Route notice (falling back to client WASM):', error.message || error);
    return NextResponse.json(
      { error: 'AI microservice unreachable', fallback: true },
      { status: 503 }
    );
  }
}
