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
                date_user_id: {
                  date: sub.end_date,
                  user_id: user.id
                }
              }
            });

            if (!debSubs) {
              await prisma.debiting_subscriptions.create({
                data: {
                  date: sub.end_date,
                  user_id: user.id,
                  price: sub.price
                }
              });
            } else {
              await prisma.debiting_subscriptions.update({
                where: {
                  date_user_id: {
                    date: sub.end_date,
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



//уведомления о списании
const notificationSubs = async () => {
  console.log(`[${new Date().toISOString()}] Запуск отправки уведомлений о списании...`);
  try {

    const subs = await prisma.subscriptions.findMany()

    const currentDate = new Date();

    for (let sub of subs) {
      try {

        const difDays = differenceInDays(sub.end_date, currentDate) + 1

        console.log(`sub difference: ${difDays}`)

        if(difDays > 0 && difDays < 4) {
          const user = await prisma.users.findUnique({
            where: { id: sub.id_user }
          })

          const email = user.email

          const subscriptionDetails = {
            subscriptionName: sub.name,
            amount: sub.price,
            in_a_few: difDays
          }

          sendSubscriptionDebitNotification(email, subscriptionDetails)

          console.log(`Письмо было отправлено на ${email}`);
        }
      } catch (error) {
        console.error(`Ошибка при отправке сообщения на почту при списании:`, error);
      }
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Ошибка при отправке уведомлений о списании:`, error);
  }
}

// Запуск каждый день в 10:00
cron.schedule('0 10 * * *', () => {
  updateExpiredSubscriptions();
});

// Запуск каждый день в 10:00
cron.schedule('0 10 * * *', () => {
  updateExpiredSubscriptions();
});

// Для теста можно запустить с другой частотой:
// Каждую минуту: '* * * * *'
// Каждый час: '0 * * * *'
// Каждый день в 3 часа ночи: '0 3 * * *'

module.exports = { updateExpiredSubscriptions, notificationSubs };