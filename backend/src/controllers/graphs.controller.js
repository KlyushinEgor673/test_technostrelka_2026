const prisma = require("../client");
const { Builder, By, until } = require("selenium-webdriver");

// Получение операций из юмани через парсинг

const graphsYoomoneySubs = async (req, res) => {
  const user = await prisma.users.findUnique({
    where: { id: req.user.id },
  });

  if (!user) {
    return res.status(404).json({ error: "Пользователь не найден" });
  }

  const email_ym = user.email_ym;
  const password_ym = user.password_ym;

  if (!email_ym || !password_ym) {
    return res.status(400).json({ error: "Вы не авторизованы в yoomoney" });
  }

  console.log(1)

  const driver = await new Builder().forBrowser("chrome").build();

  await driver.manage().deleteAllCookies();

  await driver.get(
    "https://yoomoney.ru/yooid/signin/step/login?origin=Wallet&returnUrl=https%3A%2F%2Fyoomoney.ru%2F"
  )

  console.log(2)

  try {
    await driver.sleep(2000);

    const input = await driver.wait(
      until.elementLocated(By.xpath("//input")),
      10000,
    );
    await input.sendKeys(email_ym);

    const button = await driver.wait(
      until.elementLocated(By.xpath('//button[.//span[text()="Дальше"]]')),
      10000,
    );
    await button.click();

    await driver.sleep(3000);

    const input2 = await driver.wait(
      until.elementLocated(By.xpath("(//input)[2]")),
      10000,
    );
    await input2.sendKeys(password_ym);

    const button2 = await driver.wait(
      until.elementLocated(By.xpath('//button[.//span[text()="Дальше"]]')),
      10000,
    );
    await button2.click();
    
    await driver.sleep(5000);

    const currentUrl = await driver.getCurrentUrl();
    console.log("Current URL after login:", currentUrl);

    // Проверяем, не остались ли на странице входа
    if (currentUrl.includes("signin")) {
      await driver.quit();
      return res
        .status(400)
        .json({ error: "Неверная почта или пароль", is_enter: false });
    }

    console.log(3);

    // Ждем загрузки данных
    await driver.sleep(3000);

    // Получаем данные напрямую из window.__data__
    const subsData = await driver.executeScript(`
      // Проверяем, что данные существуют
      if (!window.__data__) {
        console.log("window.__data__ не найден");
        return [];
      }
      
      console.log("window.__data__ найден");
      
      // Пробуем разные пути к данным
      let history = [];
      
      if (window.__data__.state && 
          window.__data__.state.timeline && 
          window.__data__.state.timeline.history &&
          window.__data__.state.timeline.history.entity) {
        history = window.__data__.state.timeline.history.entity;
      } else if (window.__data__.timeline && 
                 window.__data__.timeline.history && 
                 window.__data__.timeline.history.entity) {
        history = window.__data__.timeline.history.entity;
      } else {
        console.log("Не удалось найти историю операций");
        return [];
      }
      
      console.log("Найдено операций:", history.length);
      
      // Фильтруем только подписки
      return history
        .filter(op => {
          const title = op.title || '';
          return title.includes('Оплата подписки') || 
                 title.includes('подписк') ||
                 (op.categoryName && op.categoryName.includes('подписк'));
        })
        .map(op => ({
          date: op.timestamp ? op.timestamp.split('T')[0] : null,
          price: op.amount ? op.amount.value : null,
          title: op.title
        }));
    `);

    console.log("Найденные подписки:", subsData);

    // Фильтруем только те, у которых есть дата и цена
    const subs = subsData
      .filter(item => item.date && item.price)
      .map(item => ({
        date: item.date,
        price: parseFloat(item.price)
      }));

    console.log(`Найдено ${subs.length} подписок`);
    
    await driver.quit();
    res.status(200).json({ subs: subs });
    
  } catch (error) {
    console.error("Error in yoomoneyOperation:", error);
    if (driver) {
      await driver.quit();
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { graphsYoomoneySubs };