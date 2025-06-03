# Stage 1: Builder - Instal dependensi Laravel via Composer
FROM composer:2.7 AS composer_deps

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY . /app

# Stage 2: Production image
FROM php:8.2-fpm-alpine

# Install OS packages & PHP extensions
RUN apk add --no-cache \
    nginx \
    supervisor \
    bash \
    mysql-client \
    curl \
    git \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    icu-dev \
    build-base

RUN docker-php-ext-install pdo_mysql opcache bcmath exif pcntl gd intl

# Bersihkan cache apk
RUN rm -rf /var/cache/apk/*

# Konfigurasi direktori log
RUN mkdir -p /var/log/nginx /run/php && chmod -R 755 /var/log/nginx

# Hapus default config nginx
RUN rm -f /etc/nginx/conf.d/default.conf

# Salin Laravel app
COPY --from=composer_deps /app /var/www/html

# Izin folder storage & bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Salin konfigurasi nginx & supervisord
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisor/supervisord.conf /etc/supervisord.conf

# Ekspos port 80
EXPOSE 80

# Jalankan supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
