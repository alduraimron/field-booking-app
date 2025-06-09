# Stage 1: Builder
# Menggunakan image Node.js 18 untuk proses build aplikasi React.
FROM node:18-alpine AS builder

# Mengatur direktori kerja di dalam container.
WORKDIR /app

# Menyalin package.json dan package-lock.json terlebih dahulu
# untuk memanfaatkan caching Docker layer.
COPY package*.json ./

# Menginstal semua dependensi Node.js.
RUN npm install

# Menyalin seluruh kode sumber aplikasi React.
# Penting: Pastikan Anda telah menyesuaikan URL API backend di kode React Anda
# agar mengarah ke domain Ingress Kubernetes (misalnya, http://myapp.local/api)
# atau variabel lingkungan yang akan disediakan oleh Kubernetes ConfigMap.
COPY . .

# Untuk lingkungan lokal Minikube, kita tidak selalu ingin override .env dengan .env.production
# Jika Anda ingin mengelola variabel lingkungan melalui Kubernetes ConfigMap,
# Anda bisa hapus baris ini dan injeksikan variabel saat runtime di Kubernetes.
# Namun, jika Anda ingin build dengan konfigurasi produksi statis, biarkan saja.
# COPY .env.production .env # <-- Pertimbangkan untuk menghapus ini jika menggunakan ConfigMap

# Menjalankan build aplikasi React. Hasilnya akan berada di folder `dist`.
RUN npm run build

# Stage 2: Production Server (Nginx)
# Menggunakan image Nginx Alpine yang ringan untuk melayani static files.
FROM nginx:stable-alpine

# Menyalin hasil build dari stage 'builder' ke direktori serving Nginx.
COPY --from=builder /app/dist /usr/share/nginx/html

# Menyalin konfigurasi Nginx kustom Anda.
# Pastikan file `nginx.conf` ini mengarahkan lalu lintas ke `index.html` dan
# menangani routing SPA (single-page application) dengan benar.
# Contoh `nginx.conf` ada di bawah.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mengekspos port 80, yaitu port default Nginx.
EXPOSE 80

# Perintah untuk menjalankan Nginx di foreground.
CMD ["nginx", "-g", "daemon off;"]