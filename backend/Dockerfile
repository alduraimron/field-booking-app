# Stage 1: Builder
FROM php:8.3-cli-alpine AS builder

# Install system dependencies
RUN apk add --no-cache \
    git \
    zip \
    unzip \
    libzip-dev

# Install PHP extensions needed for Laravel
RUN docker-php-ext-install \
    pdo_mysql \
    zip

# Copy Composer binary from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files first for better caching
COPY ./composer.json ./composer.lock ./

# Copy essential Laravel files needed before composer install
COPY ./artisan ./
COPY ./app ./app
COPY ./bootstrap ./bootstrap
COPY ./config ./config

# Create routes directory and copy route files
# This fixes the "No such file or directory" error for routes/api.php
COPY ./routes ./routes

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy the rest of the application
COPY ./ ./

# Run Laravel's post-install scripts
RUN composer run-script post-autoload-dump
# Stage 2 production
FROM php:8.3-fpm-alpine AS production

RUN apk add --no-cache \
    php-curl \
    php-dom \
    php-json \
    php-mbstring \
    php-pdo_mysql \
    php-tokenizer \
    php-xml \
    php-xmlreader \
    php-zip

# User and group www-data are already provided by php-fpm-alpine base image

# Mengatur direktori kerja dalam kontainer produksi
WORKDIR /var/www/html

# menyalin file dari stage builder ke stage production
COPY --from=builder /app/vendor /var/www/html/vendor
COPY --from=builder /app/artisan /var/www/html/artisan
COPY --from=builder /app/bootstrap /var/www/html/bootstrap
COPY --from=builder /app/config /var/www/html/config
COPY --from=builder /app/public /var/www/html/public
COPY --from=builder /app/resources /var/www/html/resources
COPY --from=builder /app/routes /var/www/html/routes
COPY --from=builder /app/app /var/www/html/app
# No need to copy composer.json/lock to production stage

# Membuat direktori storage dan mengatur izin yang benar
# Changing to 777 to ensure write access for Laravel's cache/logs
RUN mkdir -p /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 777 /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 777 /var/www/html/bootstrap/cache

# Mengatur user yang akan menjalankan proses php-fpm
USER www-data

EXPOSE 9000
CMD ["php-fpm"]
