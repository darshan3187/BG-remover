FROM nvidia/cuda:12.1.0-runtime-ubuntu22.04

# Install Python 3.10 & OpenCV dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip \
    python3-dev \
    libgl1-mesa-glx \
    libglib2.0-0 \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements & install dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

EXPOSE 8000

ENV PORT=8000
ENV RMBG_MODEL_ID=briaai/RMBG-2.0

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
