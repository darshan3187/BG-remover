import os
import time
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from inference import process_background_removal, load_rmbg_model

app = FastAPI(
    title="BRIA RMBG-2.0 / BiRefNet AI Background Removal Service",
    description="SOTA Production-Grade Background Removal Microservice",
    version="2.0.0",
)

# Enable CORS for Next.js app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    print("[AI Microservice] Initializing server & pre-loading AI weights...")
    try:
        load_rmbg_model()
    except Exception as e:
        print(f"[AI Microservice] Warning during startup model preload: {e}")

@app.get("/health")
async def health_check():
    return JSONResponse({
        "status": "online",
        "service": "BRIA RMBG-2.0 / BiRefNet AI Microservice",
        "timestamp": time.time(),
    })

@app.get("/remove-bg")
async def remove_bg_info():
    return JSONResponse({
        "status": "active",
        "message": "AI Background Removal Endpoint active. Send HTTP POST with multipart/form-data 'file' parameter.",
        "model": "ZhengPeng7/BiRefNet",
    })

@app.post("/remove-bg")
async def remove_background_endpoint(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Provided file must be a valid image")

    start_time = time.time()
    image_bytes = await file.read()

    try:
        png_bytes = process_background_removal(image_bytes)
        processing_time = round((time.time() - start_time) * 1000, 2)

        return Response(
            content=png_bytes,
            media_type="image/png",
            headers={
                "Cache-Control": "public, max-age=31536000, immutable",
                "X-Processing-Time-Ms": str(processing_time),
                "X-AI-Engine": "BRIA-RMBG-2.0",
            },
        )
    except Exception as e:
        print(f"[AI Microservice] Error processing image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=False)
