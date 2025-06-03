# backend/Dockerfile

# Stage 1: Builder - Menginstal dependensi PHP Composer dan menyiapkan file Laravel
FROM composer:2.7 AS composer_deps

WORKDIR /app

# Copy composer files (relatif terhadap build context)
COPY composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy seluruh source code Laravel dari folder 'backend'
COPY . /app

# Jalankan optimisasi Laravel (jika perlu)
# RUN php artisan optimize:clear
# RUN php artisan optimize

# Stage 2: PHP-FPM - Menjalankan aplikasi Laravel dengan PHP-FPM dan Nginx
FROM php:8.2-fpm-alpine

# Install system dependencies (nginx, supervisor, dll)
RUN apk add --no-cache \
    nginx \
    supervisor \
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

# Install PHP extensions yang dibutuhkan Laravel
RUN docker-php-ext-install pdo_mysql opcache bcmath exif pcntl gd intl

# Bersihkan cache apk
RUN rm -rf /var/cache/apk/*

# Membuat direktori log nginx dan set permission
RUN mkdir -p /var/log/nginx \
    && chown -R www-data:www-data /var/log/nginx \
    && chmod -R 755 /var/log/nginx

# Hapus konfigurasi default Nginx yang mungkin bentrok
RUN rm -f /etc/nginx/conf.d/default.conf

# Salin kode aplikasi Laravel dari tahap builder
COPY --from=composer_deps /app /var/www/html

# Mengatur izin direktori storage dan bootstrap/cache Laravel
RUN chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 775 /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Salin konfigurasi Nginx (server block)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Salin konfigurasi Supervisor
COPY supervisor/supervisord.conf /etc/supervisord.conf

# Ekspos port 80
EXPOSE 80

# Ganti user menjadi www-data (nginx & php-fpm)
USER www-data

# Jalankan supervisord (menjalankan nginx dan php-fpm)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

# HEALTHCHECK (opsional)
# HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost/api/health || exit 1
