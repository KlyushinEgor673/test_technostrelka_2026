FROM ghcr.io/cirruslabs/flutter:stable AS builder
WORKDIR /app

# Копируем pubspec файлы
COPY pubspec.* ./

# Очищаем кэш и получаем зависимости
RUN flutter clean
RUN flutter pub cache repair
RUN flutter pub get

# Копируем остальной код
COPY . .

# Очищаем и пересобираем
RUN flutter clean
RUN flutter build web --release

FROM nginx:alpine
COPY --from=builder /app/build/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]