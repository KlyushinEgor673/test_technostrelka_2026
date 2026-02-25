//dotenv
require("dotenv").config();

//библиотеки
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

//призма
const prisma = require("./client");

//middlewares
const { authMiddleware } = require("./middlewares/auth.middleware");

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const { use } = require("react");

const app = express();

const tempStorage = new Map();
const usedCodes = new Map();

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

//тестовый запрос
app.get("/api/test", async (req, res) => {
  /* #swagger.tags = ['Test'] */
  /* #swagger.summary = 'Тестовый запрос' */
  res.status(200).json({ message: "success" });
});

//настройка почты
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//отправка письма с кодом
async function sendVerificationEmail(userEmail, verificationCode) {
  try {
    const mailOptions = {
      from: '"Мониторинг подписок" <verify.email.code79@gmail.com>',
      to: userEmail,
      subject: "Код подтверждения",
      text: `Ваш код подтверждения: ${verificationCode}`,
      html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Подтверждение email</h2>
            <p>Ваш код подтверждения:</p>
            <h1 style="color: #4CAF50; font-size: 32px;">${verificationCode}</h1>
            <p>Код действителен в течение 10 минут.</p>
          </div>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Ошибка отправки:", error);
    return { success: false, error: error.message };
  }
}

//регистрация
app.post("/api/user/register", async (req, res) => {
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Регистрация' */
  try {
    const { email, password, name, surname } = req.body;

    if (!email || !password || !name || !surname) {
      return res.status(400).json({ error: "Все поля обязательно" });
    }

    const existingUser = await prisma.users.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Пользователь с таким email уже существует" });
    }

    if (tempStorage.has(email)) {
      return res.status(429).json({ error: "Код уже был отправлен" });
    }

    const randDigit1 = Math.floor(Math.random() * 10);
    const randDigit2 = Math.floor(Math.random() * 10);
    const randDigit3 = Math.floor(Math.random() * 10);
    const randDigit4 = Math.floor(Math.random() * 10);
    const code = `${randDigit1}${randDigit2}${randDigit3}${randDigit4}`;

    tempStorage.set(email, {
      code: code,
      password: password,
      name: name,
      surname: surname,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendVerificationEmail(email, code);

    console.log(`Код ${code} отправлен на ${email}`);

    res.status(200).json({
      message: "Код подтверждения отправлен на email",
      email: email,
    });
  } catch (error) {
    console.error("Ошибка регистрации: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//вход
app.post("/api/user/enter", async (req, res) => {
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Авторизация пользователя' */
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Неверные учётные данные" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
    );

    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.error("Ошибка входа:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//редактирование пользователя (изменение профиля)
app.put("/api/user/edit", authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Редактирование профиля пользователя' */
  try {
    const { name, surname } = req.body;

    if(!name || !surname){
      return res.status(400).json({ error: "Все поля должны быть заполнены" })
    }

    const user = await prisma.users.update({
      where: { id: req.user.id },
      data: {
        name: name,
        surname: surname
      }
    });

    res.status(200).json({ status: "success" })
  } catch (error) {
    console.log("Ошибка: ", error);
    res.status(500).json({ error: "Internal server error" })
  }
});

//получение текущего пользователя
app.get("/api/user/me", authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Получение теукщего пользователя' */
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
    });
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.log("Ошибка", error);
    res.status(500).json({ error: "Internal server error" })
  }
  
});

app.post("/api/code/verify-code", async (req, res) => {
  /* #swagger.tags = ['Code'] */
  /* #swagger.summary = 'Получение кода подтверждения' */
  try {
    const { email, code } = req.body;

    // 1. Проверяем обязательные поля
    if (!email || !code) {
      return res.status(400).json({ error: "Email и код обязательны" });
    }

    // 2. Проверяем, есть ли код во временном хранилище
    const tempData = tempStorage.get(email);

    if (!tempData) {
      return res
        .status(400)
        .json({ error: "Попробуйте пройти регистрацию повторно" });
    }

    // 3. Проверяем срок действия
    if (tempData.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Код истек. Запросите новый код" });
    }

    // 4. Проверяем код
    if (tempData.code !== code) {
      return res.status(400).json({ error: "Неверный код" });
    }

    // 5. Код верный! Создаем пользователя в БД
    const hashedPassword = await bcrypt.hash(tempData.password, 10);

    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword,
        name: tempData.name,
        surname: tempData.surname,
      },
    });

    // 6. Удаляем данные из временного хранилища
    tempStorage.delete(email);

    // 7. Генерируем JWT токен
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // 8. Отправляем успешный ответ
    res.status(201).json({
      message: "Регистрация успешно завершена",
      token: token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        surname: newUser.surname,
      },
    });
  } catch (error) {
    console.error("Ошибка верификации:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Дополнительно: повторная отправка кода
app.post("/api/code/resend-code", async (req, res) => {
  /* #swagger.tags = ['Code'] */
  /* #swagger.summary = 'Повторная отправка кода подтверждения' */
  try {
    const { email } = req.body;

    const tempData = tempStorage.get(email);

    if (!tempData) {
      return res.status(404).json({ error: "Запрос на регистрацию не найден" });
    }

    // Генерируем новый код
    const newRandDigit1 = Math.floor(Math.random() * 10);
    const newRandDigit2 = Math.floor(Math.random() * 10);
    const newRandDigit3 = Math.floor(Math.random() * 10);
    const newRandDigit4 = Math.floor(Math.random() * 10);
    const newCode = `${newRandDigit1}${newRandDigit2}${newRandDigit3}${newRandDigit4}`;

    // Обновляем данные
    tempData.code = newCode;
    tempData.expiresAt = Date.now() + 5 * 60 * 1000;
    tempStorage.set(email, tempData);

    // Отправляем новый код
    await sendVerificationEmail(email, newCode);
    console.log(`Новый код ${newCode} отправлен на ${email}`);

    res.status(200).json({ message: "Новый код отправлен" });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//создание подписок
app.post('/api/subscription', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Subscription'] */
  /* #swagger.summary = 'Создание новой подписки' */
  try {
    const { name, description, start_date, end_date, price, flag_auto, img } = req.body

    if (!name) {
      return res.status(400).json({ error: "Название подписки обязательно" });
    }
    if (!start_date) {
      return res.status(400).json({ error: "Дата начала обязательна" });
    }
    if (!end_date) {
      return res.status(400).json({ error: "Дата окончания обязательна" });
    }
    if (!price && price !== 0) { // проверка с учетом, что цена может быть 0
      return res.status(400).json({ error: "Цена обязательна" });
    }
    if (flag_auto === undefined || flag_auto === null) { // для boolean
      return res.status(400).json({ error: "Флаг автопродления обязателен" });
    }

    const subscription = await prisma.subscriptions.create({
      data: {
        name: name,
        description: description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        price: price,
        flag_auto: flag_auto,
        img: img,
        id_user: req.user.id
      }
    })

    res.status(200).json({ status: "success" })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})



//изменение подписки
app.put('/api/subscription', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Subscription'] */
  /* #swagger.summary = 'Изменение данных подписки' */
  try {
    const { id, name, description, start_date, end_date, price, flag_auto, img } = req.body

    if (!id) {
      return res.status(400).json({ error: "ID подписки обязателен" });
    }

    if (!name) {
      return res.status(400).json({ error: "Название подписки обязательно" });
    }
    if (!start_date) {
      return res.status(400).json({ error: "Дата начала обязательна" });
    }
    if (!end_date) {
      return res.status(400).json({ error: "Дата окончания обязательна" });
    }
    if (!price && price !== 0) { // проверка с учетом, что цена может быть 0
      return res.status(400).json({ error: "Цена обязательна" });
    }
    if (flag_auto === undefined || flag_auto === null) { // для boolean
      return res.status(400).json({ error: "Флаг автопродления обязателен" });
    }

    const existingSubscription = await prisma.subscriptions.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingSubscription) {
      return res.status(404).json({ error: "Подписка не найдена" });
    }

    if(existingSubscription.id_user !== req.user.id){
      return res.status(403).json({ error: "Нет доступа" })
    }

    const subscription = await prisma.subscriptions.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        description: description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        price: price,
        flag_auto: flag_auto,
        img: img
      }
    })

    res.status(200).json({ status: "success" })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})



//получение всех подписок (ИЗМЕНИТЬ НА ПОЛУЧЕНИЕ ВСЕХ ПОДПИСОК ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ)
app.get('/api/subscription', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Subscription'] */
  /* #swagger.summary = 'Получение всех подписок пользователя' */
  try {
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
      id_user: req.user.id
      },
      orderBy: {
        id: "asc"
      }
    })
    res.status(200).json({ subscriptions: subscriptions })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})



//удаление подписки
app.delete('/api/subscription', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['Subscription'] */
  /* #swagger.summary = 'Удаление подписки' */
  try {
    const id = req.body.id

    if (!id) {
      return res.status(400).json({ error: "ID подписки обязателен" });
    }

    const subscriptionValid = await prisma.subscriptions.findUnique({
      where: {id: parseInt(id)}
    })

    if(!subscriptionValid){
      return res.status(404).json({ error: "Подписка не найдена" });
    }

    if(subscriptionValid.id_user !== req.user.id){
       return res.status(403).json({ error: "Нет доступа" })
    }

    const subscription = await prisma.subscriptions.delete({
      where: { id: parseInt(id) }
    })
    
    res.status(200).json({ status: "success" })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})



// получение access-токена (yoomoney)
app.post('/api/exchange-token', authMiddleware, async  (req, res) => {

  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Получение access-токена для yoomoney (используется только с фронта 1 раз)' */

  console.log(`[${new Date().toISOString()}] POST /api/exchange-token called`);
  console.log(`Request ID: ${Math.random().toString(36).substring(7)}`);
  console.log(`Headers:`, req.headers);
  console.log(`Body:`, req.body);
  
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Код обязателен' });
    }

    if(usedCodes.has(code)){
      console.log(`Код ${code} уже был использован. Запрос проигнорирован.`)
      return res.status(200).json({ error: "данный код уже использовался" })
    }

    usedCodes.set(code, { inProgress: true, userId: req.user.id })

    console.log(`[${new Date().toISOString()}] Sending request to YooMoney...`);
    
    const response = await fetch('https://yoomoney.ru/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: '6EFCC0255452172DD4C176A7429F2D4F71AFDE69F3EEAA18DFCCA727903F01F2',
        grant_type: 'authorization_code',
        redirect_uri: 'https://localhost.ru:8080',
        client_secret: '455A0A2D77D5F9DC82D86586215E65ECA0255E265B270F7C35A2BE8DC5B314D12A8B2A124C2AB17300A9336BA3DA6BC1F75B2D85B7F0B70E7018EA399D2DCF67'
      })
    });
    
    console.log(`[${new Date().toISOString()}] Received response from YooMoney with status: ${response.status}`);
    
    const data = await response.json();
    console.log(`Response data:`, data);

    if(!data.access_token){
      usedCodes.delete(code)
      return res.status(400).json({ error: "Неверный токен" })
    }

    await prisma.users.update({
      where: { id: req.user.id },
      data: {
        access_token_yoomoney: data.access_token
      }
    })

    usedCodes.set(code, { inProgress: false, success: true, userId: req.user.id })

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



// получение истории операций (yoomoney)
app.post('/api/operation-history', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Получение истории операций' */
  try {

    const bodyParams = new URLSearchParams();

    const user = await prisma.users.findUnique({
      where: { id: req.user.id }
    })
    const access_token = user.access_token_yoomoney

    // перечень типов операций: deposition — пополнение счета (пополнение), payment — платежи со счета (траты)
    if(req.params.type) bodyParams.append('type', req.params.type)
    // отбор платежей по значению метки (сам хз что это, надо разобраться)
    if(req.params.label) bodyParams.append('label', req.params.label)
    // операции, равные from, или более поздние
    if(req.params.from) bodyParams.append('from', req.params.from)
    // операции более ранние, чем till
    if(req.params.till) bodyParams.append('till', req.params.till)
    // если параметр присутствует, то будут отображены операции, начиная с номера start_record. Операции нумеруются с 0
    if(req.params.start_record) bodyParams.append('start_record', req.params.start_record)
    // количество запрашиваемых записей истории операций. Допустимые значения: от 1 до 100, по умолчанию — 30
    if(req.params.records) bodyParams.append('records', req.params.records)
    // показывать подробные детали операции. По умолчанию false. Для отображения деталей операции требуется наличие права operation-details
    if(req.params.details) bodyParams.append('details', req.params.details)

    if(bodyParams.length === 0){
      bodyParams.append('records', 100)
    }

    const response = await fetch('https://yoomoney.ru/api/operation-history', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams
    })

    if(!response.ok){
      return res.status(400).json({ error: response.status })
    }

    const data = await response.json()

    if(data.error){
      return res.status(400).json({ error: data.error })
    }

    res.status(200).json({ subscriptions: data })

  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



// получение информации об операции (для yoomoney)
app.post('/api/operation-details', authMiddleware, async (req, res) => {
  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Получение информации об операции' */
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Параметры запроса',
      required: true,
      schema: {
        operation_id: ""
      }
  } */
  try {
    const { operation_id } = req.body;
    if (!operation_id) {
      return res.status(400).json({ error: "Идентификатор операции обязателен" });
    }

    const user = await prisma.users.findUnique({
      where: { id: req.user.id }
    });
    const access_token = user.access_token_yoomoney;

    const bodyParams = new URLSearchParams();
    bodyParams.append('operation_id', operation_id);

    const response = await fetch('https://yoomoney.ru/api/operation-details', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YooMoney API error:', response.status, errorText);
      return res.status(400).json({ error: `YooMoney API error: ${response.status}` });
    }

    const data = await response.json();
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json({ details: data });
  } catch (error) {
    console.error('Error in operation-details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
