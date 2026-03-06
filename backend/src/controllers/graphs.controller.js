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
        "//div[@data-qa='history']",
      ),
    );
    const subs = [];
    
    console.log(3)

    for (let div of divOperations) {
      try {
        console.log(4)

        const checkIsSub = await div.findElement(By.xpath('.//div/div[1]/div[2]/span[1]')).getText();
        
        console.log(checkIsSub)
        
        if(checkIsSub === "Оплата подписки"){  
          console.log(5)
          

          //разобраться правильно ли нажимает
          await driver.executeScript("arguments[0].click();", div);
          
          console.log(6)
          const detail = await driver.findElements(
            By.xpath(
              "//div[@data-qa='detail']",
            ),
          );


          console.log(7)
          
          const notFormattedDateEl = await detail.findElement(By.xpath(".//span[@data-qa='datetime']"));
          const NotFormattedPriceEl = await detail.findElement(By.xpath(".//span[@data-qa='amount-rub']//span[1]"));

          const notFormattedDate = await notFormattedDateEl.getText()
          const notFormattedPrice = await NotFormattedPriceEl.getText()

          const date = notFormattedDate
          const price = parseFloat(notFormattedPrice.slice(0, -1))

          console.log(date, price)

          subs.push({ date: date, price: price })
        }
      } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Произошла ошибка при получении подписок из Yoomoney" })
      }
      
    }

    // await driver.quit();

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
