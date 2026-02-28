const express = require('express');
const router = express.Router();
const { 
  createSubscription, 
  updateSubscription, 
  getSubscriptions, 
  deleteSubscription 
} = require('../controllers/subscription.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Создание подписки
router.post("/",  authMiddleware, 
  /* #swagger.tags = ['Subscription'] #swagger.summary = 'Создание новой подписки' */
  createSubscription
);

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