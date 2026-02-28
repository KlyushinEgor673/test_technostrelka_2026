const express = require('express');
const router = express.Router();
const { 
  exchangeToken,
  getOperationHistory,
  getOperationDetails,
  yoomoneyLogin,
  // yoomoneyLogout,
  getCookies,
  getYoomoneySubscriptions
} = require('../controllers/yoomoney.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Обмен токена
router.post("/exchange-token", authMiddleware, 
  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Получение access-токена для yoomoney (используется только с фронта 1 раз)' */
  exchangeToken
);

// История операций
router.post("/operation/history", authMiddleware,
  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Получение истории операций' */
  getOperationHistory
);

// Детали операции
router.post("/operation/details", authMiddleware,
  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Получение информации об операции' */
  getOperationDetails
);

// Вход в YooMoney
router.post("/enter", authMiddleware,
  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Вход в yoomoney' */
  yoomoneyLogin
);

// // Выход из YooMoney
// router.post("/logout", authMiddleware, 
//   /* #swagger.tags = ['yoomoney'] */
//   /* #swagger.summary = 'Выход из аккауета yoomoney' */
//   yoomoneyLogout
// );

// Получение cookies
router.get("/getCookies", authMiddleware,
  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Получение cookies вошедших пользователей' */
  getCookies
);

// Получение подписок из YooMoney
router.get("/subscription", authMiddleware,
  /* #swagger.tags = ['yoomoney'] */
  /* #swagger.summary = 'Получение подписок из YooMoney' */
  getYoomoneySubscriptions
);

module.exports = router;