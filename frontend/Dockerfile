# --- Stage 1: Build the Flutter web app ---
FROM ghcr.io/cirruslabs/flutter:stable AS builder

WORKDIR /app

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    && rm -rf /var/lib/apt/lists/*

# Копируем pubspec файлы для кэширования зависимостей
COPY pubspec.* ./

# Получаем зависимости (Flutter уже установлен в образе)
RUN flutter clean
RUN flutter pub get

# Копируем остальной код
COPY . .

# Собираем приложение
RUN flutter build web --release

# --- Stage 2: Serve the app with Nginx ---
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/build/web /usr/share/nginx/html

# Создаем конфигурацию Nginx
RUN echo "server { \
    listen 8080; \
    server_name localhost.ru; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]