// dotenv
require("dotenv").config();

// библиотеки
const express = require("express");
const cors = require("cors");
const cron = require('node-cron');

// парсинг (оставляем для Selenium)
require('chromedriver');

// призма
const prisma = require("./client");

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

// маршруты
const routes = require("./routes/index");

// функции
const { updateExpiredSubscriptions, notificationSubs } = require('./services/cron')

const app = express();

updateExpiredSubscriptions();
notificationSubs();

cron.schedule('0 10 * * *', () => {
  updateExpiredSubscriptions();
})

cron.schedule('0 10 * * *', () => {
  notificationSubs();
})

// CORS настройки
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  }),
);

// Swagger документация
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Парсинг JSON
app.use(express.json());

// Подключаем все маршруты с префиксом /api
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}/api-docs`);
});