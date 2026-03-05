const express = require('express');
const router = express.Router();
const { 
  createSubscription, 
  updateSubscription, 
  getSubscriptions,
  getHistorySubscriptions,
  deleteSubscription 
} = require('../controllers/subscription.controller');
const multer = require('multer')
const { authMiddleware } = require('../middlewares/auth.middleware');

const upload = multer()

// Создание подписки с файлом
router.post(
  "/", 
  upload.single('img'), authMiddleware, 
  /* #swagger.tags = ['Subscription'] */
  /* #swagger.summary = 'Создание подписки' */
  /* #swagger.description = 'Создание новой подписки с возможностью загрузки изображения' */
  /* #swagger.consumes = ['multipart/form-data'] */
  /* #swagger.parameters['name'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Название подписки'
  } */
  /* #swagger.parameters['category'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Категория подписки'
  } */
  /* #swagger.parameters['period'] = {
    in: 'formData',
    type: 'integer',
    required: true,
    description: 'Период оплаты подписки (в днях)'
  } */
  /* #swagger.parameters['end_date'] = {
    in: 'formData',
    type: 'string',
    format: 'date',
    required: true,
    description: 'Дата окончания подписки (YYYY-MM-DD)'
  } */
  /* #swagger.parameters['price'] = {
    in: 'formData',
    type: 'number',
    format: 'float',
    required: true,
    description: 'Цена подписки'
  } */
  /* #swagger.parameters['flag_auto'] = {
    in: 'formData',
    type: 'boolean',
    required: true,
    description: 'Флаг автопродления (true/false)'
  } */
  /* #swagger.parameters['url'] = {
    in: 'formData',
    type: 'string',
    format: 'uri',
    required: true,
    description: 'URL оплаты'
  } */
  /* #swagger.parameters['img'] = {
    in: 'formData',
    type: 'file',
    required: false,
    description: 'Файл изображения (jpg, png, gif)'
  } */
  /* #swagger.responses[201] = {
    description: 'Подписка успешно создана',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Подписка успешно создана' }
      }
    }
  } */
  /* #swagger.responses[400] = {
    description: 'Ошибка валидации - не все обязательные поля заполнены или неверный формат'
  } */
  /* #swagger.responses[401] = {
    description: 'Unauthorized - отсутствует или недействителен JWT токен'
  } */
  /* #swagger.responses[500] = {
    description: 'Internal Server Error - внутренняя ошибка сервера'
  } */
  createSubscription
);

// Изменение подписки
router.put("/", upload.single('img'), authMiddleware,
  /* #swagger.tags = ['Subscription'] */
  /* #swagger.summary = 'Изменение данных подписки' */
  /* #swagger.description = 'Изменение подписки с возможностью загрузки изображения' */
  /* #swagger.consumes = ['multipart/form-data'] */
  /* #swagger.parameters['id'] = {
    in: 'formData',
    type: 'integer',
    required: true,
    description: 'id подписки'
  } */
  /* #swagger.parameters['name'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Название подписки'
  } */
  /* #swagger.parameters['category'] = {
    in: 'formData',
    type: 'string',
    required: true,
    description: 'Категория подписки'
  } */
  /* #swagger.parameters['period'] = {
    in: 'formData',
    type: 'integer',
    required: true,
    description: 'Период оплаты подписки (в днях)'
  } */
  /* #swagger.parameters['end_date'] = {
    in: 'formData',
    type: 'string',
    format: 'date',
    required: true,
    description: 'Дата окончания подписки (YYYY-MM-DD)'
  } */
  /* #swagger.parameters['price'] = {
    in: 'formData',
    type: 'number',
    format: 'float',
    required: true,
    description: 'Цена подписки'
  } */
  /* #swagger.parameters['flag_auto'] = {
    in: 'formData',
    type: 'boolean',
    required: true,
    description: 'Флаг автопродления (true/false)'
  } */
  /* #swagger.parameters['url'] = {
    in: 'formData',
    type: 'string',
    format: 'uri',
    required: true,
    description: 'URL оплаты'
  } */
  /* #swagger.parameters['img'] = {
    in: 'formData',
    type: 'file',
    required: false,
    description: 'Файл изображения (jpg, png, gif)'
  } */
  /* #swagger.responses[200] = {
    description: 'Подписка успешно изменена',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Подписка успешно изменена' }
      }
    }
  } */
  /* #swagger.responses[400] = {
    description: 'Ошибка валидации - не все обязательные поля заполнены или неверный формат'
  } */
  /* #swagger.responses[401] = {
    description: 'Unauthorized - отсутствует или недействителен JWT токен'
  } */
  /* #swagger.responses[500] = {
    description: 'Internal Server Error - внутренняя ошибка сервера'
  } */
  updateSubscription
);

// Получение всех подписок
router.get("/", authMiddleware, 
  /* #swagger.tags = ['Subscription'] #swagger.summary = 'Получение всех подписок пользователя' */
  getSubscriptions
);

// Получение истории всех подписок
router.get("/history", authMiddleware, 
  /* #swagger.tags = ['Subscription'] #swagger.summary = 'Получение всей истории подписок пользователя' */
  getHistorySubscriptions
);

// Удаление подписки
router.delete("/", authMiddleware,
  /* #swagger.tags = ['Subscription'] #swagger.summary = 'Удаление подписки' */
  deleteSubscription
);

module.exports = router;