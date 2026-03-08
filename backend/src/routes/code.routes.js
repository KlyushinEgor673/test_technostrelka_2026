const express = require('express');
const router = express.Router();
const { verifyCode, resendCode, pushNotifications } = require('../controllers/code.controller');

// Верификация кода
router.post("/verify-code",
  /* #swagger.tags = ['Code'] #swagger.summary = 'Получение кода подтверждения' */
  verifyCode
);

// Повторная отправка кода
router.post("/resend-code", 
  /* #swagger.tags = ['Code'] #swagger.summary = 'Повторная отправка кода подтверждения' */
  resendCode
);

// Push-уведомление о списании
router.get("/push-notifications", 
  /* #swagger.tags = ['Code'] #swagger.summary = 'Push-уведомление о списании' */
  pushNotifications
);

module.exports = router;