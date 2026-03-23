const cron = require('node-cron');
const prisma = require('../client');
const { addDays, differenceInDays } = require('date-fns');
const { bytesToBase64 } = require('byte-base64');
const { sendSubscriptionDebitNotification } = require('./email.service')



// Функция для обновления подписок
const updateExpiredSubscriptions = async () => {
  console.log(`[${new Date().toISOString()}] Запуск проверки просроченных подписок...`);

  try {
    // Получаем всех пользователей (или можно получать подписки по одному)
    const users = await prisma.users.findMany({
      select: { id: true }
    });

    const currentDate = new Date();

    for (const user of users) {
      const subs = await prisma.subscriptions.findMany({
        where: {
          id_user: user.id
        }
      });

      for (const sub of subs) {
        if (differenceInDays(sub.end_date, currentDate) < 1) {
          if (sub.flag_auto == true) {
            const newDate = addDays(sub.end_date, sub.period);

            await prisma.subscriptions.update({
              where: { id: sub.id },
              data: {
                end_date: newDate
              }
            });

            const debSubs = await prisma.debiting_subscriptions.findUnique({
              where: {
                date_category_id_user_id: {
                  date: sub.end_date,
                  category_id: sub.category_id,
                  user_id: user.id
                }
              }
            });

            if (!debSubs) {
              await prisma.debiting_subscriptions.create({
                data: {
                  date: sub.end_date,
                  category_id: sub.category_id,
                  user_id: user.id,
                  price: sub.price
                }
              });
            } else {
              await prisma.debiting_subscriptions.update({
                where: {
                  date_category_id_user_id: {
                    date: sub.end_date,
                    category_id: sub.category_id,
                    user_id: user.id
                  }
                },
                data: {
                  price: {
                    increment: sub.price
                  }
                }
              });
            }
          } else {
            await prisma.subscriptions.delete({
              where: { id: sub.id }
            });
          }
        }
      }
    }

    console.log(`[${new Date().toISOString()}] Проверка завершена успешно`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Ошибка при обновлении подписок:`, error);
  }
};



//уведомления о списаниич
const notificationSubs = async () => {
  console.log(`[${new Date().toISOString()}] Запуск отправки уведомлений о списании...`);
  try {
    const currentDate = new Date();
    // Устанавливаем время на начало дня для корректного сравнения
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    
    const subs = await prisma.subscriptions.findMany({
      where: {
        end_date: {
          gte: today, // только активные подписки
        }
      }
    });

    for (let sub of subs) {
      try {
        const difDays = differenceInDays(sub.end_date, today);
        
        if (difDays >= 1 && difDays <= 3) {
          const user = await prisma.users.findUnique({
            where: { id: sub.id_user }
          });

          if (user?.email) {
            const subscriptionDetails = {
              subscriptionName: sub.name,
              amount: sub.price,
              in_a_few: difDays
            };

            await sendSubscriptionDebitNotification(user.email, subscriptionDetails);
            console.log(`Письмо отправлено на ${user.email} для подписки ${sub.name}`);
          }
        }
      } catch (error) {
        console.error(`Ошибка при отправке уведомления для подписки ${sub.id}:`, error);
      }
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Ошибка при отправке уведомлений о списании:`, error);
  }
};

// Для теста можно запустить с другой частотой:
// Каждую минуту: '* * * * *'
// Каждый час: '0 * * * *'
// Каждый день в 3 часа ночи: '0 3 * * *'

module.exports = { updateExpiredSubscriptions, notificationSubs };