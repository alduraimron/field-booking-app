# backend/Dockerfile

# Stage 1: Builder - Menginstal dependensi PHP Composer dan menyiapkan file Laravel
FROM composer:2.7 as composer_deps

WORKDIR /app

# Copy composer files relative to the build context (which is project-akhir-PAW/)
# So, we need to specify 'backend/'
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy seluruh source code Laravel dari folder 'backend' di build context
COPY backend/. /app

# Jalankan optimisasi Laravel
RUN php artisan optimize:clear
RUN php artisan optimize

# Stage 2: PHP-FPM - Menjalankan aplikasi Laravel dengan PHP-FPM dan Nginx
FROM php:8.2-fpm-alpine

# Install system dependencies (nginx, supervisor, etc)
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

# Membuat direktori Nginx logs dan set permission
RUN mkdir -p /var/log/nginx \
    && chown -R www-data:www-data /var/log/nginx \
    && chmod -R 755 /var/log/nginx

# Hapus konfigurasi default Nginx yang mungkin bentrok
RUN rm /etc/nginx/conf.d/default.conf

# Salin kode aplikasi Laravel dari tahap builder
# Ini akan menyalin konten /app dari composer_deps (yang sudah berisi semua file Laravel dari folder 'backend')
# ke /var/www/html di stage ini.
COPY --from=composer_deps /app /var/www/html

# Mengatur izin direktori storage Laravel
RUN chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 775 /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Konfigurasi Nginx
# Asumsi: backend/nginx/nginx.conf hanya berisi server {} block
COPY backend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Konfigurasi Supervisor
# Asumsi: backend/supervisor/supervisord.conf sudah benar
COPY backend/supervisor/supervisord.conf /etc/supervisord.conf

# Expose port 80
EXPOSE 80

# Ganti user ke www-data (user nginx & php-fpm)
USER www-data

# Jalankan supervisord (menjalankan nginx + php-fpm)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

# HEALTHCHECK -- Opsional, tapi disarankan
# HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost/api/health || exit 1
