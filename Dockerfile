FROM nginx:1.13.1-alpine

EXPOSE 80

COPY dist/oneshop  /var/www/store-book
COPY config/nginx.conf /etc/nginx/conf.d/store-book.conf