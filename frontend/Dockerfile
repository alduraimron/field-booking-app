# frontend/Dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY . .
COPY .env.production .env
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
