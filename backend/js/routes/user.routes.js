const express = require('express');
const router = express.Router();
const { register, login, editProfile, editEmail, getMe } = require('../controllers/user.controller');
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
router.put("/edit-profile", authMiddleware,
  /* #swagger.tags = ['Users'] #swagger.summary = 'Редактирование профиля пользователя' */
  editProfile
);

// Редактирование профиля
router.put("/edit-email", authMiddleware,
  /* #swagger.tags = ['Users'] #swagger.summary = 'Редактирование почты пользователя' */
  editEmail
);

// Получение текущего пользователя
router.get("/me", authMiddleware,
  /* #swagger.tags = ['Users'] #swagger.summary = 'Получение теукщего пользователя' */
  getMe
);

module.exports = router;