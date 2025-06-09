#!/bin/bash

# Start PHP-FPM di background
php-fpm &

# Start Nginx di foreground (agar container tetap hidup)
nginx -g "daemon off;"
