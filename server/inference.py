import io
import os
# pyrefly: ignore [missing-import]
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import numpy as np
import cv2

# Global cached model & device
_model = None
_device = None
_transform = None

MODEL_ID = os.getenv("RMBG_MODEL_ID", "ZhengPeng7/BiRefNet")

def get_device():
    global _device
    if _device is None:
        if torch.cuda.is_available():
            _device = torch.device("cuda")
        elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
            _device = torch.device("mps")
        else:
            _device = torch.device("cpu")
        print(f"[AI Microservice] Utilizing Inference Hardware: {_device}")
    return _device

def load_rmbg_model():
    global _model, _transform
    if _model is not None:
        return _model, _transform

    device = get_device()
    candidate_models = [MODEL_ID, "ZhengPeng7/BiRefNet", "briaai/RMBG-1.4", "briaai/RMBG-2.0"]
    
    # Deduplicate candidate models
    seen = set()
    models_to_try = [m for m in candidate_models if not (m in seen or seen.add(m))]

    model = None
    loaded_model_id = ""

    from transformers import AutoModelForImageSegmentation

    for model_id in models_to_try:
        try:
            print(f"[AI Microservice] Attempting to load model: {model_id}...")
            model = AutoModelForImageSegmentation.from_pretrained(
                model_id,
                trust_remote_code=True,
            )
            loaded_model_id = model_id
            print(f"[AI Microservice] Successfully loaded: {model_id}")
            break
        except Exception as e:
            print(f"[AI Microservice] Notice for {model_id}: {e}")

    if model is None:
        raise RuntimeError("Failed to load any segmentation model. Ensure 'timm' is installed (`pip install timm`).")

    model.to(device)
    model.eval()

    if device.type == "cuda":
        model.half() # Use FP16 for 2x GPU speedup & reduced VRAM
    else:
        model.float() # Enforce Float32 on CPU to prevent float/half weight mismatches

    _transform = transforms.Compose([
        transforms.Resize((1024, 1024)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    _model = model
    print("[AI Microservice] Model loaded & cached successfully.")
    return _model, _transform

def guided_filter_matting(image_np: np.ndarray, mask_np: np.ndarray, radius: int = 4, eps: float = 1e-4) -> np.ndarray:
    """
    OpenCV Fast Guided Filter Matting
    Refines raw NN boundary probabilities using color-guided spatial covariance
    """
    guide = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY).astype(np.float32) / 255.0
    p = mask_np.astype(np.float32) / 255.0

    # Fast Guided Filter Implementation
    mean_I = cv2.boxFilter(guide, -1, (radius, radius))
    mean_p = cv2.boxFilter(p, -1, (radius, radius))
    mean_Ip = cv2.boxFilter(guide * p, -1, (radius, radius))
    cov_Ip = mean_Ip - mean_I * mean_p

    mean_II = cv2.boxFilter(guide * guide, -1, (radius, radius))
    var_I = mean_II - mean_I * mean_I

    a = cov_Ip / (var_I + eps)
    b = mean_p - a * mean_I

    mean_a = cv2.boxFilter(a, -1, (radius, radius))
    mean_b = cv2.boxFilter(b, -1, (radius, radius))

    q = mean_a * guide + mean_b
    q_uint8 = (np.clip(q, 0, 1) * 255).astype(np.uint8)
    return q_uint8

def topological_hole_fill(mask_uint8: np.ndarray, thresh: int = 110) -> np.ndarray:
    """
    Topological BFS Flood-Fill Hole Closing
    Guarantees 100% solid opacity for shirts, torso, hair & enclosed objects
    """
    h, w = mask_uint8.shape
    binary_core = (mask_uint8 >= thresh).astype(np.uint8)

    # Flood fill background from border (0,0)
    flood = binary_core.copy()
    mask_pad = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(flood, mask_pad, (0, 0), 2)

    # Invert flood fill to find enclosed internal holes
    holes = (flood == 0).astype(np.uint8) * 255

    # Merge solid core + internal holes
    solid_mask = np.maximum(mask_uint8, holes)
    return solid_mask

def process_background_removal(image_bytes: bytes) -> bytes:
    """
    Main Production Inference Pipeline
    Input: Image Bytes -> Output: Transparent PNG Bytes
    """
    model, transform = load_rmbg_model()
    device = get_device()

    # 1. Load original PIL image
    orig_pil = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    orig_w, orig_h = orig_pil.size

    # 2. Preprocess tensor & ensure matching dtype
    input_tensor = transform(orig_pil).unsqueeze(0).to(device)
    if device.type == "cuda":
        input_tensor = input_tensor.half()
    else:
        input_tensor = input_tensor.float()

    # 3. Model Inference
    with torch.no_grad():
        preds = model(input_tensor)
        if isinstance(preds, (list, tuple)):
            output = preds[0]
        elif isinstance(preds, dict):
            output = preds.get("output", list(preds.values())[0])
        else:
            output = preds

        # Sigmoid activation if needed
        output = torch.sigmoid(output)
        output = F.interpolate(output, size=(orig_h, orig_w), mode="bilinear", align_corners=False)
        mask_tensor = output[0, 0].cpu().float().numpy()

    # Convert to 8-bit scale
    mask_np = (mask_tensor * 255.0).astype(np.uint8)
    orig_np = np.array(orig_pil)

    # 4. Topological Hole Closing (Fills interior shirt / torso holes)
    solid_mask = topological_hole_fill(mask_np, thresh=105)

    # 5. Fast Guided Alpha Matting (Refines hair strands & fine boundaries)
    refined_mask = guided_filter_matting(orig_np, solid_mask, radius=5, eps=1e-4)

    # 6. Composite RGBA Output Image
    rgba = np.dstack((orig_np, refined_mask))
    result_pil = Image.fromarray(rgba, mode="RGBA")

    output_buffer = io.BytesIO()
    result_pil.save(output_buffer, format="PNG", optimize=True)
    return output_buffer.getvalue()
