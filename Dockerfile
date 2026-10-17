# Multi-stage Dockerfile for Agri-Link Full-Stack Platform
FROM node:20-slim AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY ml_backend/requirements.txt ./ml_backend/requirements.txt
RUN pip install --no-cache-dir -r ./ml_backend/requirements.txt

# Copy project source
COPY . .
COPY --from=frontend-build /app/dist ./dist

ENV PORT=5000
ENV HOST=0.0.0.0
ENV PYTHONUNBUFFERED=1

EXPOSE 5000

CMD ["python", "ml_backend/server.py"]
