const express = require('express');
const router = express.Router();
const { 
  exchangeToken,
  getOperationHistory,
  getOperationDetails,
  yoomoneyLogin,
  checkSessionStatus,
  checkCodeYoomoney,
  getCookies,
  getYoomoneySubscriptions
} = require('../controllers/yoomoney.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Обмен токена
router.post("/exchange-token", authMiddleware, 
  /* #swagger.tags = ['Yoomoney'] */
  /* #swagger.summary = 'Получение access-токена для yoomoney (используется только с фронта 1 раз)' */
  exchangeToken
);

// История операций
router.post("/operation-history", authMiddleware,
  /* #swagger.tags = ['Yoomoney'] */
  /* #swagger.summary = 'Получение истории операций' */
  getOperationHistory
);

// Детали операции
router.post("/operation-details", authMiddleware,
  /* #swagger.tags = ['Yoomoney'] */
  /* #swagger.summary = 'Получение информации об операции' */
  getOperationDetails
);

// Вход в YooMoney
router.post("/enter", authMiddleware,
  /* #swagger.tags = ['Yoomoney'] */
  /* #swagger.summary = 'Вход в yoomoney' */
  yoomoneyLogin
);

// Проверка статуса сессии
router.post('/check-session',authMiddleware,
  /* #swagger.tags = ['Yoomoney'] */
  /* #swagger.summary = 'Проверка статуса сессии Yoomoney' */
  checkSessionStatus
);
// Подтверждение кода в YooMoney
router.post("/check-code-yoomoney", authMiddleware, 
  /* #swagger.tags = ['Yoomoney'] */
  /* #swagger.summary = 'Подтверждение кода Yoomoney' */
  checkCodeYoomoney
);

// Получение cookies
router.get("/getCookies", authMiddleware,
  /* #swagger.tags = ['Yoomoney'] */
  /* #swagger.summary = 'Получение cookies вошедших пользователей' */
  getCookies
);

// Получение подписок из YooMoney
router.get("/subscription", authMiddleware,
  /* #swagger.tags = ['Yoomoney'] */
  /* #swagger.summary = 'Получение подписок из YooMoney' */
  getYoomoneySubscriptions
);

module.exports = router;