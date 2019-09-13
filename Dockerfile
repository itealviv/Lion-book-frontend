FROM nginx:1.13.1-alpine

EXPOSE 80

COPY dist/oneshop  /var/www/oneshop
COPY config/nginx.conf /etc/nginx/conf.d/book-store.conf