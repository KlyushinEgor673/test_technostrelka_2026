const cron = require('node-cron');
const prisma = require('../client');
const { addDays, differenceInDays } = require('date-fns');
const { bytesToBase64 } = require('byte-base64');

// Функция для обновления подписок
const updateExpiredSubscriptions = async () => {
  console.log(`[${new Date().toISOString()}] Запуск проверки просроченных подписок...`);
  
  try {
    // Получаем всех пользователей (или можно получать подписки по одному)
    const users = await prisma.users.findMany({
      select: { id: true }
    });

    for (const user of users) {
      const subs = await prisma.subscriptions.findMany({
        where: {
          id_user: user.id
        }
      });

      const currentDate = new Date();

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

// Запуск каждый день в 00:00 (полночь)
cron.schedule('0 0 * * *', () => {
  updateExpiredSubscriptions();
});

// Для теста можно запустить с другой частотой:
// Каждую минуту: '* * * * *'
// Каждый час: '0 * * * *'
// Каждый день в 3 часа ночи: '0 3 * * *'

module.exports = { updateExpiredSubscriptions };