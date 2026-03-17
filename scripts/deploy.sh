cd ./infra
sed -i.bak s#\\\${SERVICE_NAME}#$SERVICE_NAME#g infra/docker-compose.yml
sed -i.bak s#\\\${IMAGE_VERSION}#$IMAGE_VERSION#g infra/docker-compose.yml

chmod +x ./configure-apache.sh
chmod +x ./deploy_frontend.sh
./deploy_frontend.sh
sleep 5
./configure-apache.sh