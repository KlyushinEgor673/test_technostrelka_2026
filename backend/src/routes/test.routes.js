const express = require('express');
const router = express.Router();

// Тестовый запрос
router.get("/test", async (req, res) => {
  /* #swagger.tags = ['Test'] #swagger.summary = 'Тестовый запрос' */
  res.status(200).json({ message: "success" });
});

module.exports = router;