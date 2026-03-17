cd ./infra
sed -i.bak s#\\\${SERVICE_NAME}#$SERVICE_NAME#g infra/docker-compose.yml
sed -i.bak s#\\\${IMAGE_VERSION}#$IMAGE_VERSION#g infra/docker-compose.yml

docker compose down
docker rmi daniel101/${SERVICE_NAME}:"${IMAGE_VERSION}"
docker compose up -d

sleep 5

# remove cache files
rm -rf /etc/apache2/sites-enabled/norte4j.com
rm -rf /etc/apache2/sites-available/norte4j.com

# apache configuration
cp ./norte4j.com.conf /etc/apache2/sites-available/
a2ensite norte4j.com.conf
systemctl restart apache2

## certbot configuration

#certbot --apache \
#          -d norte4j.com \
#          --agree-tos \
#          --non-interactive \
#          --register-unsafely-without-email \
#          --redirect
