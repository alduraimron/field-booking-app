# Stage 1 builder
FROM php:8.3-cli-alpine AS builder

RUN apk add --no-cache \
    git \
    zip \
    unzip

# menyalin composer binary dari image composer resmi
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# mengatur direktory kerja di dalam kontainer builder
WORKDIR /app

# menyalin file composer untuk memanfaatkan caching docker
COPY ./composer.json ./composer.lock ./

# menyalin seluruh kode aplikasi laravel dari host ke direktori kerja container docker
# layer ini akan di invalidasi jika ada perubahan pada file aplikasi
COPY ./ .

# menginstall depedensi composer
RUN composer install --no-dev --optimize-autoloader



# stafe 2 production

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

# mengatur user dan group yang akan menjalankan PHP-FPM
# RUN addgroup -g 82 -S www-data \
#     && adduser -u 82 -D -S -G www-data www-data

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
COPY --from=builder /app/composer.json /var/www/html/composer.json
COPY --from=builder /app/composer.lock /var/www/html/composer.lock

# Membuat direktori storage dan mengatur izin yang benar
RUN mkdir -p /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 775 /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Mengatur user yang akan menjalankan proses php-fpm
USER www-data

EXPOSE 9000
CMD ["php-fpm"]
