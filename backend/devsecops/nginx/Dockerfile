FROM nginx:alpine

COPY /devsecops/nginx/nginx.conf /etc/nginx/conf.d/default.conf

#RUN rm /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
