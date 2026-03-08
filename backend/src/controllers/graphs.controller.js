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

  driver.get(
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

    // const divOperations = await driver.findElements(
    //   By.xpath(
    //     "//div[@class='MuiBox-root css-14223cq']//div[@class='MuiBox-root css-dggkwl']/div[not(@class)]//span[@class='tocfcbQ2']",
    //   ),
    // );
    const divOperations = await driver.findElements(
      By.xpath(
        "//div[@data-qa='operation']"
      )
    );
    const subs = [];
    
    console.log(3)

    for (let div of divOperations) {
      try {
        console.log(4);

        const checkIsSub = await div.findElement(By.xpath(
          ".//div[@class='MuiBox-root css-14223cq']" +
          "//div[@class='MuiBox-root css-dggkwl']" +
          "/div[not(@class)]" +
          "//span[@data-qa='operation-title']"
        )).getText();

        console.log(checkIsSub);
        
        if (checkIsSub === "Оплата подписки") {
          console.log(5);

          // Кликаем
          await driver.executeScript("scrollBy(0, 500)")

          try {
            await driver.executeScript("arguments[0].click();", div);
            console.log("Есть пробитие")
          } catch (error) {
            return res.status(400).json({ error: "не нажалось" })
          }
          
          
          // const pageSource = await driver.getPageSource();
          // if (pageSource.includes('operation-details') || pageSource.includes('datetime')) {
          //   console.log("Модальное окно обнаружено в HTML");
          // } else {
          //   console.log("Модальное окно НЕ обнаружено в HTML");
            
          //   // Возможно нужно прокрутить к элементу перед кликом
          //   await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", div);
          //   await driver.sleep(1000);
          //   await driver.executeScript("arguments[0].click();", div);
          // }

          // Ждем появления модального окна
          await driver.sleep(3000);
          
          console.log(6);
          
          // Ищем дату и цену (В ОСНОВНОМ DOM, НЕ В IFRAME)
          try {

            //        !!!!! ОН НЕ МОЖЕТ НАЙТИ detail после клика (словно клик и не срабатывает) !!!!!!
            const detailDiv = await driver.wait(
              until.elementLocated(By.xpath("//div[@class='k9KGTzPt']")),
              10000,
              "Модальное окно с деталями не появилось"
            );

            const notFormattedDateEl = await details.findElement(By.xpath(
              "//span[@data-qa='datetime']"
            ));
            
            const notFormattedPriceEl = await driver.findElement(By.xpath(
              "//span[@data-qa='amount-rub']//span[1]"
            ));

            const notFormattedDate = await notFormattedDateEl.getText();
            const notFormattedPrice = await notFormattedPriceEl.getText();

            console.log(notFormattedDate)
            console.log(notFormattedPrice)

            const date = notFormattedDate.split(' ')[0];
            const price = parseFloat(notFormattedPrice.replace(/\s/g, '').replace(',', '.'));

            console.log("Найдена подписка:", date, price);

            subs.push({ date, price });
            
            // Закрываем модальное окно (нажимаем Escape)
            // await driver.actions().sendKeys('\uE00C').perform(); // Escape key
            // await driver.sleep(1000);
            
          } catch (innerError) {
            console.log("Ошибка при получении данных:", innerError.message);
          }
        }
      } catch (error) {
        console.log("Ошибка при обработке элемента:", error.message);
      }
    }

    await driver.quit();

    res.status(200).json({ subs });
  } catch (error) {
    console.error("Error in yoomoneyOperation:", error);
    if (driver) {
      await driver.quit();
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { graphsYoomoneySubs };