# --- Stage 1: Build the Flutter web app ---
FROM ubuntu:latest AS builder

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa

# Install Flutter
RUN git clone https://github.com/flutter/flutter.git /flutter
ENV PATH="/flutter/bin:${PATH}"
RUN flutter channel stable
RUN flutter upgrade
RUN flutter doctor

# Copy app source and build
WORKDIR /app
COPY . .
RUN flutter pub get
RUN flutter build web --release

# --- Stage 2: Serve the app with Nginx ---
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/build/web /usr/share/nginx/html

# Копируем сертификаты из проекта (они уже есть в корне)
COPY localhost.ru.pem /etc/nginx/
COPY localhost.ru-key.pem /etc/nginx/

# Создаем конфиг с HTTPS одной строкой
RUN echo "server { listen 8080 ssl; server_name localhost.ru; ssl_certificate /etc/nginx/localhost.ru.pem; ssl_certificate_key /etc/nginx/localhost.ru-key.pem; root /usr/share/nginx/html; index index.html; location / { try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]