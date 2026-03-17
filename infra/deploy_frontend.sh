docker compose down
docker rmi daniel101/${SERVICE_NAME}:"${IMAGE_VERSION}"
docker compose up -d
