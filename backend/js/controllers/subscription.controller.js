const prisma = require("../client");
const { bytesToBase64 } = require('byte-base64')

// Создание подписки
const createSubscription = async (req, res) => {
  try {
    console.log('req.file:', req.file); // Что тут?
    console.log('req.body:', req.body); // Что тут?
    console.log('req.headers.content-type:', req.headers['content-type']);

    const { name, description, start_date, end_date, price, flag_auto, url } = req.body
    const img = req.file?.buffer

    if (!req.file) {
      return res.status(400).json({ error: "Файл не получен. Проверьте FormData" });
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
      return res.status(400).json({ error: "URL оплаты обязателен" }) // исправил 200 на 400
    }

    await prisma.subscriptions.create({
      data: {
        name: name,
        description: description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        price: price,
        flag_auto: !!flag_auto,
        img: img,
        url: url,
        id_user: req.user.id
      }
    })

    res.status(200).json({ status: "success" })
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Изменение подписки
const updateSubscription = async (req, res) => {
  try {
    const { id, name, description, start_date, end_date, price, flag_auto, img, url } = req.body

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

    const subscription = await prisma.subscriptions.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        description: description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        price: price,
        flag_auto: flag_auto,
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
        // Определяем MIME тип (можно сохранять его в БД или определять по первым байтам)
        // Для простоты предположим, что это JPEG
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