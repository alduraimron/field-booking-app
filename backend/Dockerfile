# Stage 1: Composer - install dependencies
FROM composer:2.7 AS composer_deps

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY . /app

# Stage 2: PHP-FPM + Nginx
FROM php:8.2-fpm-alpine

# Install Nginx & dependencies
RUN apk add --no-cache \
    nginx \
    bash \
    mysql-client \
    curl \
    git \
    build-base \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    icu-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql opcache bcmath exif pcntl gd intl

# Bersihkan cache
RUN rm -rf /var/cache/apk/*

# Buat direktori log & socket PHP
RUN mkdir -p /var/log/nginx /run/php && chmod -R 755 /var/log/nginx

# Hapus default config nginx
RUN rm -f /etc/nginx/conf.d/default.conf

# Salin Laravel app
COPY --from=composer_deps /app /var/www/html

# Ubah permission storage & cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Salin konfigurasi nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Salin skrip start
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
