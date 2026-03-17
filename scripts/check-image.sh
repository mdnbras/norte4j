#!/bin/bash
set -e

# Uso:
# ./check_docker_image.sh <imagem> [tag]
# Exemplo:
# ./check_docker_image.sh library/nginx latest

IMAGE=$1
TAG=${2:-latest}

if [ -z "$IMAGE" ]; then
  echo "Uso: $0 <imagem> [tag]"
  exit 1
fi

# Separar namespace e repo
if [[ "$IMAGE" != *"/"* ]]; then
  # imagens oficiais ficam no namespace library
  NAMESPACE="library"
  REPO="$IMAGE"
else
  NAMESPACE=$(echo "$IMAGE" | cut -d'/' -f1)
  REPO=$(echo "$IMAGE" | cut -d'/' -f2)
fi

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