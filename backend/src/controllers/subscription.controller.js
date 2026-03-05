const prisma = require("../client");
const { parseISO } = require('date-fns')
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

    const formattedEndDate = parseISO(end_date);
    const formattedPeriod = parseInt(period);
    const formattedPrice = parseFloat(price);
    const flagAutoBool = flag_auto === 'true' || flag_auto === true;

    console.log("end_date:", end_date);
    console.log("period:", period);
    
    
    console.log("formattedEndDate:", formattedEndDate);
    console.log("formattedPeriod:", formattedPeriod);
    console.log("formattedPrice:", formattedPrice);
    
    let debitDate = formattedEndDate;
    debitDate.setDate(formattedEndDate.getDate() - formattedPeriod);

    console.log("debitDate:", debitDate);
    
    console.log("Дата списания: ", debitDate);

    const existingDebit = await prisma.debiting_subscriptions.findFirst({
      where: { date: debitDate }
    });

    if (!existingDebit) {
      await prisma.debiting_subscriptions.create({
        data: {
          date: debitDate,
          price: parseFloat(formattedPrice),
          user_id: req.user.id
        }
      });
    } else {
      const sumPrice = parseFloat(formattedPrice) + parseFloat(existingDebit.price);
      await prisma.debiting_subscriptions.update({
        where: {
          date: debitDate
        },
        data: {
          price: sumPrice
        }
      });
    }

    await prisma.subscriptions.create({
      data: {
        name: name,
        category: category,
        period: formattedPeriod,
        end_date: formattedEndDate,
        price: formattedPrice,
        flag_auto: flagAutoBool,
        img: img,
        url: url,
        id_user: req.user.id
      }
    });

    return res.status(201).json({ 
      status: "success",
      message: "Подписка успешно создана" 
    });

  } catch (error) {
    console.error("Ошибка:", error);
    
    // Проверяем, не отправлен ли уже ответ
    if (!res.headersSent) {
      return res.status(500).json({ 
        error: "Internal server error",
        details: error.message 
      });
    }
  }
};



// Изменение подписки
const updateSubscription = async (req, res) => {
  try {
    const { id, name, category, period, end_date, price, flag_auto, url } = req.body
    const img = req.file?.buffer

    if (!id) {
      return res.status(400).json({ error: "ID подписки обязателен" });
    }
    if (!name) {
      return res.status(400).json({ error: "Название подписки обязательно" });
    }
    if (!category) {
      return res.status(400).json({ error: "Категория подписки обязательна" });
    }
    if (!period) {
      return res.status(400).json({ error: "Период подписки обязателен" });
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


    try {

      const formattedEndDate = parseISO(end_date);
      const formattedPeriod = parseInt(period);
      const formattedPrice = parseFloat(price);
      const flagAutoBool = flag_auto === 'true' || flag_auto === true;
      
      console.log("formattedEndDate:", formattedEndDate);
      console.log("formattedPeriod:", formattedPeriod);
      console.log("formattedPrice:", formattedPrice);
      
      let date = formattedEndDate;
      date.setDate(formattedEndDate.getDate() - formattedPeriod);

      const checkDate = await prisma.debiting_subscriptions.findFirst({
        where: { date: date }
      })

      //если измененной даты не существует
      if(!checkDate){

        //получаем подписку, которую собираемся изменить (ее изначальный вид)
        const sub = await prisma.subscriptions.findUnique({
          where: { id: id}
        })

        //проверяем, есть ли подписки на новую дату
        const newDate = date

        const checkNewDate = await prisma.debiting_subscriptions.findFirst({
          where: { date: newDate }
        })

        //если подписок на новую дату нет:
        if(!checkNewDate){
          // создаем подписку (изменяем текущую и добавляем в табличку) на эту дату
          await prisma.debiting_subscriptions.create({
            data: {
              date: newDate,
              price: price,
              user_id: req.user.id
            }
          })

          //проверяем была ли это единственная подписка на старую дату (для того, чтобы удалять или оставить прошлую дату)
          const checkUniqueSub = await prisma.debiting_subscriptions.findFirst({
            where: { date: sub.date }
          })

          //если вся сумма за тот день равна сумма нашей подписки (еще не измененной), то удаляем эту дату
          if(checkUniqueSub.price == sub.price){
            await prisma.debiting_subscriptions.delete({
              where: { date: sub.date }
            })
          } else {
            //если неравна

            //получаем новую сумму без той подписки
            const newPrice = checkUniqueSub.price - sub.price
            
            //обновляем цену
            await prisma.debiting_subscriptions.update({
              where: { date: sub.date },
              data: {
                price: newPrice
              }
            })
          }
        }  
      } else {
        //если пользователь не менял дату

        //ищем текущую подписку для изменения цены в таблице debiting_subscriptions
        const sub = await prisma.subscriptions.findUnique({
          where: { id: parseInt(id) }
        })

        //получаем изменение цены подписки
        const oldPrice = sub.price
        const newPrice = formattedPrice
        const difference = newPrice - oldPrice

        //обновлем траты за этот день
        await prisma.debiting_subscriptions.update({
          where: {
            date: date
          },
          data: {
            date: date,
            price: {
              increment: parseFloat(difference)
            },
            user_id: req.user.id
          }
        })
      }

      //обновляем саму подписку
      await prisma.subscriptions.update({
        where: { id: parseInt(id) },
        data: {
          name: name,
          category: category,
          period: formattedPeriod,
          end_date: formattedEndDate,
          price: formattedPrice,
          flag_auto: flagAutoBool,
          img: img, 
          url: url
        }
      })
    } catch (error) {
      console.error("Ошибка: ", error);
      return res.status(500).json({ error: "Произошла ошибка при изменении подписки" });
    }

    res.status(200).json({ status: "success" })
  } catch (error) {
    // Проверяем, не отправлен ли уже ответ
    if (!res.headersSent) {
      return res.status(500).json({ 
        error: "Internal server error",
        details: error.message 
      });
    }
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

    const sub = await prisma.subscriptions.findUnique({
      where: {id: parseInt(id)}
    })

    if(!sub){
      return res.status(404).json({ error: "Подписка не найдена" });
    }

    if(sub.id_user !== req.user.id){
       return res.status(403).json({ error: "Нет доступа" })
    }


    try {

      const sub = await prisma.subscriptions.findUnique({
        where: { id: parseInt(id) }
      })

      const formattedEndDate = sub.end_date;
      const formattedPeriod = parseInt(sub.period);
      
      console.log("formattedEndDate:", formattedEndDate);
      console.log("formattedPeriod:", formattedPeriod);
      
      let date = formattedEndDate;
      date.setDate(formattedEndDate.getDate() - formattedPeriod);

      const dateDebit = await prisma.debiting_subscriptions.findFirst({
        where: { date: date }
      })

      //проверка является ли подписка единственной в этот день
      if(dateDebit.price == sub.price){
        await prisma.debiting_subscriptions.delete({
          where: { date: date }
        })
      } else {

        const newPrice = dateDebit.price - sub.price

        await prisma.debiting_subscriptions.update({
          where: { date: date },
          data: {
            price: newPrice
          }
        })
      }

      await prisma.subscriptions.delete({
        where: { id: id }
      })

    } catch (error) {
      console.error("Произошла ошибка при удалении подписки :", error);
      res.status(500).json({ error: "Произошла ошибка при удалении подписки" });
    }

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