const prisma = require("../client");
const { usedCodes, driverStorage, cookieStorage, userData } = require("../utils/tempStorage");
const { Builder, By, until } = require('selenium-webdriver');
























// Получение всей истории подписок пользователя
const getHistorySubscriptions = async (req, res) => {
  try {
    const debSubscriptions = await prisma.debiting_subscriptions.findMany({
      where: {
        user_id: req.user.id
      },
      orderBy: {
        id: "asc"
      }
    })

    if(!debSubscriptions){
      return res.status(404).json({ message: "Пользователь с таким id не найден" })
    }

    res.status(200).json({ debSubscriptions: debSubscriptions })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};