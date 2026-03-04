const prisma = require("../client");
const { bytesToBase64 } = require('byte-base64')

// Создание подписки
const createSubscription = async (req, res) => {
  try {
    const { name, category, period, end_date, price, flag_auto, url } = req.body
    const img = req.file?.buffer

    if (!req.file) {
      return res.status(400).json({ error: "Файл не получен. Проверьте FormData" });
    }

    if (!name) {
      return res.status(400).json({ error: "Название подписки обязательно" });
    }
    if (!category) {
      return res.status(400).json({ error: "Категория подписки обязательна" });
    }
    if (!period) {
      return res.status(400).json({ error: "Период оплаты подписки обязателен" });
    }
    if (!end_date) {
      return res.status(400).json({ error: "Дата окончания обязательна" });
    }
    if (!price && price !== 0) {
      return res.status(400).json({ error: "Цена обязательна" });
    }
    if (flag_auto === undefined || flag_auto === null) {
      return res.status(400).json({ error: "Флаг автопродления обязателен" });
    }
    if (!url) {
      return res.status(400).json({ error: "URL оплаты обязателен" })
    }

    try {
      const formattedEndDate = end_date.slice(10)
      console.log("formattedEndDate ", formattedEndDate)

      const formattedPeriod = parseInt(period)
      console.log("formattedPeriod ", formattedPeriod)
      
      let date = new Date(formattedEndDate);
      date.setDate(end_date.getDate() - period);
      
      const checkData = prisma.debiting_subscriptions.findFirst({
        where: { date: date }
      })

      if(!checkData){
        await prisma.debiting_subscriptions.create({
          data: {
            date: date,
            price: price,
            user_id: req.user.id
          }
        })
      } else {
        const sumPrice = price + checkData.price
        await prisma.debiting_subscriptions.update({
          where: {
            date: date
          },
          data: {
            date: date,
            price: sumPrice,
            user_id: req.user.id
          }
        })
      }

      await prisma.subscriptions.create({
        data: {
          name: name,
          category: category,
          period: period,
          end_date: new Date(end_date),
          price: price,
          flag_auto: !!flag_auto,
          img: img,
          url: url,
          id_user: req.user.id
        }
      })
    } catch (error) {
      console.error("Ошибка при создании подписки:", error);
      res.status(400).json({ error: "Произошла ошибка при создании подписки" });
    }

    

    res.status(200).json({ status: "success" })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Изменение подписки
const updateSubscription = async (req, res) => {
  try {
    const { id, name, description, start_date, end_date, price, flag_auto, url } = req.body
    const img = req.file?.buffer

    if (!id) {
      return res.status(400).json({ error: "ID подписки обязателен" });
    }
    if (!name) {
      return res.status(400).json({ error: "Название подписки обязательно" });
    }
    if (!start_date) {
      return res.status(400).json({ error: "Дата начала обязательна" });
    }
    if (!end_date) {
      return res.status(400).json({ error: "Дата окончания обязательна" });
    }
    if (!price && price !== 0) {
      return res.status(400).json({ error: "Цена обязательна" });
    }
    if (flag_auto === undefined || flag_auto === null) {
      return res.status(400).json({ error: "Флаг автопродления обязателен" });
    }
    if (!url) {
      return res.status(400).json({ error: "URL оплаты обязателен" });
    }

    const existingSubscription = await prisma.subscriptions.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingSubscription) {
      return res.status(404).json({ error: "Подписка не найдена" });
    }

    if(existingSubscription.id_user !== req.user.id){
      return res.status(403).json({ error: "Нет доступа" })
    }

    await prisma.subscriptions.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        description: description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        price: price,
        flag_auto: !!flag_auto,
        img: img, 
        url: url
      }
    })

    res.status(200).json({ status: "success" })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Получение всех подписок пользователя
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await prisma.subscriptions.findMany({
      where: {
        id_user: req.user.id
      },
      orderBy: {
        id: "asc"
      }
    })

    const subscriptionsWithBase64 = subscriptions.map(sub => {
      if (sub.img) {
        sub.img = bytesToBase64(sub.img)
      }
      return sub;
    });

    res.status(200).json({ subscriptions: subscriptionsWithBase64 })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Удаление подписки
const deleteSubscription = async (req, res) => {
  try {
    const id = req.body.id

    if (!id) {
      return res.status(400).json({ error: "ID подписки обязателен" });
    }

    const subscriptionValid = await prisma.subscriptions.findUnique({
      where: {id: parseInt(id)}
    })

    if(!subscriptionValid){
      return res.status(404).json({ error: "Подписка не найдена" });
    }

    if(subscriptionValid.id_user !== req.user.id){
       return res.status(403).json({ error: "Нет доступа" })
    }
    
    await prisma.subscriptions.delete({
      where: { id: id }
    })
    
    res.status(200).json({ status: "success" })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { 
  createSubscription, 
  updateSubscription, 
  getSubscriptions, 
  deleteSubscription 
};