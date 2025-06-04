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
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    icu-dev \
    oniguruma-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        zip \
        gd \
        intl \
        mbstring \
        bcmath


# Mengatur direktori kerja dalam kontainer produksi
WORKDIR /var/www/html

# Copy application files from builder stage
COPY --from=builder --chown=www-data:www-data /app /var/www/html

# Create necessary directories with proper permissions
RUN mkdir -p /var/www/html/storage/framework/cache \
    && mkdir -p /var/www/html/storage/framework/sessions \
    && mkdir -p /var/www/html/storage/framework/views \
    && mkdir -p /var/www/html/storage/logs \
    && mkdir -p /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache
# Mengatur user yang akan menjalankan proses php-fpm
USER www-data

EXPOSE 9000
CMD ["php-fpm"]
