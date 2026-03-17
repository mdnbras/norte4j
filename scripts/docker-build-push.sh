#!/bin/bash
set -e

REPOSITORY_URI="daniel101/${SERVICE_NAME}"

docker image build -t "${REPOSITORY_URI}":"${IMAGE_VERSION}" .
docker tag "${REPOSITORY_URI}":"${IMAGE_VERSION}" daniel101/"${SERVICE_NAME}":"${IMAGE_VERSION}"
docker push daniel101/"${SERVICE_NAME}":"${IMAGE_VERSION}"
docker rmi daniel101/"${SERVICE_NAME}":"${IMAGE_VERSION}"
