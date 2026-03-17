#!/bin/bash
set -e

URL="https://hub.docker.com/v2/repositories/daniel101/${SERVICE_NAME}/tags/${IMAGE_VERSION}"

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

if [ "$HTTP_STATUS" -eq 200 ]; then
  echo "✅ Imagem encontrada: ${SERVICE_NAME}:${IMAGE_VERSION}"
  exit 0
elif [ "$HTTP_STATUS" -eq 404 ]; then
  echo "❌ Imagem ou tag não encontrada: ${SERVICE_NAME}:${IMAGE_VERSION}"
  exit 1
else
  echo "⚠️ Erro ao consultar Docker Hub (status: $HTTP_STATUS)"
  exit 2
fi