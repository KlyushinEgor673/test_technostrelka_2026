const express = require('express');
const router = express.Router();
const { 
  createSubscription, 
  updateSubscription, 
  getSubscriptions, 
  deleteSubscription 
} = require('../controllers/subscription.controller');
const multer = require('multer')
const { authMiddleware } = require('../middlewares/auth.middleware');

const upload = multer()

// Создание подписки с файлом
router.post("/", authMiddleware, upload.single('img'), createSubscription);

// Изменение подписки
router.put("/", authMiddleware,
  /* #swagger.tags = ['Subscription'] #swagger.summary = 'Изменение данных подписки' */
  updateSubscription
);

// Получение всех подписок
router.get("/", authMiddleware, 
  /* #swagger.tags = ['Subscription'] #swagger.summary = 'Получение всех подписок пользователя' */
  getSubscriptions
);

// Удаление подписки
router.delete("/", authMiddleware,
  /* #swagger.tags = ['Subscription'] #swagger.summary = 'Удаление подписки' */
  deleteSubscription
);

module.exports = router;