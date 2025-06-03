# # Stage 1: Builder - Menginstal dependensi PHP Composer dan menyiapkan file Laravel
# FROM composer:2.7 as composer_deps
# WORKDIR /app
# COPY backend/composer.json backend/composer.lock ./
# RUN composer install --no-dev --optimize-autoloader --no-scripts
# COPY backend/ . /app
# RUN php artisan optimize:clear
# RUN php artisan optimize

# # Stage 2: PHP-FPM - Menjalankan aplikasi Laravel dengan PHP-FPM
# FROM php:8.2-fpm-alpine

# # Menginstal dependensi sistem yang diperlukan oleh PHP dan Laravel
# RUN apk add --no-cache \
#     nginx \
#     supervisor \
#     bash \
#     mysql-client \
#     curl \
#     git \
#     build-base \
#     libpng-dev \
#     libjpeg-turbo-dev \
#     libwebp-dev \
#     freetype-dev \
#     icu-dev \
#     # Tambahkan lebih banyak dependensi PHP jika diperlukan oleh Laravel Anda
#     # Misalnya: gd (untuk image manipulation), zip (untuk ZipArchive)

# # Menginstal ekstensi PHP yang diperlukan
# RUN docker-php-ext-install pdo_mysql opcache bcmath exif pcntl gd intl

# # Menghapus cache APK setelah instalasi
# RUN rm -rf /var/cache/apk/*

# # Konfigurasi PHP-FPM untuk menjalankan worker processes
# COPY backend/php-fpm-config.conf /usr/local/etc/php-fpm.d/www.conf
# # Atau gunakan default jika php-fpm-config.conf tidak ada/dibutuhkan

# # Salin kode aplikasi Laravel dari tahap builder
# COPY --from=composer_deps /app /var/www/html

# # Mengatur izin direktori storage Laravel
# RUN chown -R www-data:www-data /var/www/html/storage \
#     && chmod -R 775 /var/www/html/storage \
#     && chown -R www-data:www-data /var/www/html/bootstrap/cache \
#     && chmod -R 775 /var/www/html/bootstrap/cache

# # Konfigurasi Nginx
# COPY backend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# # Konfigurasi Supervisor untuk menjalankan Nginx dan PHP-FPM
# # Supervisor akan memastikan Nginx dan PHP-FPM selalu berjalan
# COPY backend/supervisor/supervisord.conf /etc/supervisord.conf

# # Mengekspos port 80 untuk Nginx
# EXPOSE 80

# # Mengganti user default menjadi www-data untuk proses Nginx/PHP-FPM
# # Ini adalah praktik keamanan yang baik
# USER www-data

# # Perintah untuk menjalankan Supervisor
# # Supervisor akan menjalankan Nginx dan PHP-FPM
# CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

# # HEALTHCHECK -- Opsional, tapi disarankan
# # HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost/api/health || exit 1
# Stage 1: Builder - install composer dependencies & prepare Laravel app
FROM composer:2.7 as composer_deps

WORKDIR /app

# Copy composer files dan install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy semua source Laravel
COPY . /app

RUN php artisan optimize:clear
RUN php artisan optimize

# Stage 2: Runtime PHP-FPM + Nginx
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

# Copy konfigurasi php-fpm jika ada (opsional)
COPY php-fpm-config.conf /usr/local/etc/php-fpm.d/www.conf

# Copy hasil build composer dari stage 1 ke folder aplikasi
COPY --from=composer_deps /app /var/www/html

# Set permission storage dan bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 775 /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Copy konfigurasi nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy konfigurasi supervisor
COPY supervisor/supervisord.conf /etc/supervisord.conf

# Expose port 80
EXPOSE 80

# Ganti user ke www-data (user nginx & php-fpm)
USER www-data

# Jalankan supervisord (menjalankan nginx + php-fpm)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
