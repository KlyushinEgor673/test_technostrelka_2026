const express = require('express');
const router = express.Router();
const { register, login, editProfile, getMe } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Регистрация
router.post("/register", 
  /* #swagger.tags = ['Users'] #swagger.summary = 'Регистрация' */ 
  register
);

// Вход
router.post("/enter",
  /* #swagger.tags = ['Users'] #swagger.summary = 'Авторизация пользователя' */
  login
);

// Редактирование профиля
router.put("/edit", authMiddleware,
  /* #swagger.tags = ['Users'] #swagger.summary = 'Редактирование профиля пользователя' */
  editProfile
);

// Получение текущего пользователя
router.get("/me", authMiddleware,
  /* #swagger.tags = ['Users'] #swagger.summary = 'Получение теукщего пользователя' */
  getMe
);

module.exports = router;