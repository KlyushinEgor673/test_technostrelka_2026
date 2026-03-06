const express = require('express');
const router = express.Router();
const { graphsYoomoneySubs } = require('../controllers/graphs.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

router.get('/graphsYoomoneySubs', authMiddleware, 
  /* #swagger.tags = ['Graphs'] #swagger.summary = 'Получение данных для графика из Yoomoney' */
  graphsYoomoneySubs
)

module.exports = router; 