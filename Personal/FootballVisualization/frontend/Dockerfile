FROM nginx

# Copy deployment
RUN mkdir -p /home/ubuntu/web_deploy/

WORKDIR /home/ubuntu/web_deploy/
VOLUME /home/ubuntu/web_deploy/

COPY nginx.conf ./

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
