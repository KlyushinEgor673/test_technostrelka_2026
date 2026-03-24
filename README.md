**Ссылка на видео**<br/>
https://disk.yandex.ru/d/yXX0FdDImSPZ1A

## Инструкция по запуску

**Для работы необходимо следующее**
1. postgres
2. nodejs 
3. npm
4. docker
5. adb
6. эмулятор android'а
7. эмулятор iphone'а


**Backend:**
1. Перейдите в папку backend
2. Создайте файл .env и вставьте туда этот код
```
PORT=3000
DATABASE_URL="postgresql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>"
JWT_SECRET="secret"
EMAIL_USER="verify.email.code79@gmail.com"
EMAIL_PASSWORD="dcvy ezks xgsk mwpw"
```
**Что надо заменить (даннные вашей бд):**<br/>
<db_user> - имя пользователя postgres<br/>
<db_password> - пароль пользователя postgres<br/>
<db_host> - хост от postgres<br/>
<db_port> - порт postrges<br/>
<db_name> - название базы данных

3. В терминале написать:
    1) ```npm i```
    2) ```npm run prisma db push```
    3) ```npm run prisma generate```
    4) ```npm run dev```

**Frontend:**
1. Перейдите в папку frontend
2. В терминале написать:
    1) ```docker build -t flutter_app .```
    2) ```docker run -p 8080:8080 flutter_app  ```
3. Перейти по ссылке http://localhost:8080

**Android:**
1. Запустить эмулятор
2. Перейти в папку android
3. В терминале написать 
```adb install app-release.apk```
4. Запустить установленное приложение

**IOS:**
1. Запустить эмулятор
2. Перейти в папку ios
3. Перетащить файл Runner.app в эмулятор айфона
4. Запустить установленное приложение