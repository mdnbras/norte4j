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
