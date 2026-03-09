const { sub } = require("date-fns");
const prisma = require("../client");
const { bytesToBase64 } = require('byte-base64');
const { addDays, differenceInDays }  = require('date-fns')

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

    const formattedEndDate = new Date(end_date);
    formattedEndDate.setDate(formattedEndDate.getDate() + 1);
    const formattedPeriod = parseInt(period);
    const formattedPrice = parseFloat(price);
    const flagAutoBool = flag_auto === 'true' || flag_auto === true;

    console.log("end_date:", end_date);
    console.log("period:", period);


    console.log("formattedEndDate:", formattedEndDate);
    console.log("formattedPeriod:", formattedPeriod);
    console.log("formattedPrice:", formattedPrice);

    let debitDate = new Date(formattedEndDate);
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
          user_id: req.user.id,
          price: parseFloat(formattedPrice),
          user_id: req.user.id
        }
      });
    } else {
      const sumPrice = parseFloat(formattedPrice) + parseFloat(existingDebit.price);
      await prisma.debiting_subscriptions.update({
        where: {
          date_user_id: {
            date: debitDate,
            user_id: req.user.id
          }
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

    if (existingSubscription.id_user !== req.user.id) {
      return res.status(403).json({ error: "Нет доступа" })
    }


    try {

      const formattedEndDate = new Date(end_date);
      // formattedEndDate.setDate(formattedEndDate.getDate() + 1);
      const formattedPeriod = parseInt(period);
      const formattedPrice = parseFloat(price);
      const flagAutoBool = flag_auto === 'true' || flag_auto === true;


      const oldSub = await prisma.subscriptions.findUnique({
        where: { id: parseInt(id) },
      })

      const newPayDate = new Date(formattedEndDate)
      newPayDate.setDate(newPayDate.getDate() - formattedPeriod)
      const oldPayDate = new Date(oldSub.end_date)
      oldPayDate.setDate(oldPayDate.getDate() - oldSub.period)
      console.log("Даты", newPayDate, oldPayDate)

      const debitingSubscriptionOld = await prisma.debiting_subscriptions.findUnique({
        where: {
          date_user_id: {
            date: oldPayDate,
            user_id: req.user.id
          }
        }
      })

      if (newPayDate.getDate() == oldPayDate.getDate()) {
        console.log('ravno')
        await prisma.debiting_subscriptions.update({
          where: {
            date_user_id: {
              date: oldPayDate,
              user_id: req.user.id
            }
          },
          data: {
            price: debitingSubscriptionOld.price - oldSub.price + formattedPrice
          }
        })
      } else {
        console.log('OLDATE', oldPayDate)
        await prisma.debiting_subscriptions.update({
          where: {
            date_user_id: {
              date: oldPayDate,
              user_id: req.user.id
            }
          },
          data: {
            price: debitingSubscriptionOld.price - oldSub.price
          }
        })
        console.log(debitingSubscriptionOld.price - oldSub.price)
        const debitingSubscriptionNew = await prisma.debiting_subscriptions.findUnique({
          where: {
            date_user_id: {
              date: newPayDate,
              user_id: req.user.id
            }
          }
        })
        if (!debitingSubscriptionNew) {
          await prisma.debiting_subscriptions.create({
            data: {
              price: formattedPrice,
              user_id: req.user.id,
              date: newPayDate
            }
          })
        } else {
          await prisma.debiting_subscriptions.update({
            where: {
              date_user_id: {
                date: oldPayDate,
                user_id: req.user.id
              }
            },
            data: {
              price: debitingSubscriptionNew.price + formattedPrice
            }
          })
        }
      }

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
    const subs = await prisma.subscriptions.findMany({
      where: {
        id_user: req.user.id
      },
      orderBy: {
        id: 'asc'
      }
    })

    const currentDate = new Date()

    for (let sub of subs){
      if(differenceInDays(sub.end_date, currentDate) < 1){
        //сюда добавить условие, стоит ли флаг автопродления
        if (sub.flag_auto == true) {
          const newDate = addDays(sub.end_date, sub.period)

          await prisma.subscriptions.update({
            where: { id: sub.id },
            data: {
              end_date: newDate
            }
          })
          console.log("1. обновилась подписка")


          const debSubs = await prisma.debiting_subscriptions.findUnique({
            where: { 
              date_user_id: {
                date: sub.end_date,
                user_id: req.user.id
              }
            }
          })
          console.log("2. ищет debSubs")

          if(!debSubs){
            await prisma.debiting_subscriptions.create({
              data: {
                date: sub.end_date,
                user_id: req.user.id,
                price: sub.price
              }
            })
            console.log("3. создает новый")
          } else {
            await prisma.debiting_subscriptions.update({
              where: {
                date_user_id: {
                  date: sub.end_date,
                  user_id: req.user.id
                }
              },
              data: {
                price: {
                  increment: sub.price
                }
              }
            })
            console.log("3. обновляет старый")
          }
        } else {
          await prisma.subscriptions.delete({
            where: { id: sub.id }
          })
          console.log("2. удаляет старую подписку")
        }
        
      }
    }

    const subscriptionsWithBase64 = subs.map(sub => {
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



// Получение всей истории подписок пользователя
const getHistorySubscriptions = async (req, res) => {
  try {
    const debSubscriptions = await prisma.debiting_subscriptions.findMany({
      where: {
        user_id: req.user.id
      },
      orderBy: {
        date: "asc"
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




// Удаление подписки
const deleteSubscription = async (req, res) => {
  try {
    const id = req.body.id

    if (!id) {
      return res.status(400).json({ error: "ID подписки обязателен" });
    }

    const sub = await prisma.subscriptions.findUnique({
      where: { id: parseInt(id) }
    })

    if (!sub) {
      return res.status(404).json({ error: "Подписка не найдена" });
    }

    if (sub.id_user !== req.user.id) {
      return res.status(403).json({ error: "Нет доступа" })
    }


    try {

      const sub = await prisma.subscriptions.findUnique({
        where: { id: parseInt(id) }
      })

      const formattedEndDate = sub.end_date;
      // formattedEndDate.setDate(formattedEndDate.getDate() + 1);
      const formattedPeriod = parseInt(sub.period);

      console.log("DELETE formattedEndDate:", formattedEndDate);
      console.log("DELETE formattedPeriod:", formattedPeriod);

      let date = new Date(formattedEndDate);
      date.setDate(formattedEndDate.getDate() - formattedPeriod);
      console.log("DELETE date:", date);

      const dateDebit = await prisma.debiting_subscriptions.findFirst({
        where: { date: date }
      })

      //проверка является ли подписка единственной в этот день
      if (dateDebit.price == sub.price) {
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
  getHistorySubscriptions,
  deleteSubscription
};