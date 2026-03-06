const prisma = require("../client");

// Получение операций из юмани через парсинг

const yoomoneyOperation = async (req, res) => {

  const user = await prisma.users.findUnique({
    where: { id: req.user.id}
  })

  if(!user){
    return res.status(404).json({ error: "Пользователь не найден"}) 
  }

  const email_ym = user.email_ym;
  const password_ym = user.password_ym;

  if(!email_ym || !password_ym){
    return res.status(400).json({ error: "Вы не авторизованы в yoomoney" });
  }

  const driver = await new Builder().forBrowser('chrome').build();

  await driver.manage().deleteAllCookies();

  driver.get("https://yoomoney.ru/yooid/signin/step/login?origin=Wallet&returnUrl=https%3A%2F%2Fyoomoney.ru%2F");

  try {
    await driver.sleep(2000);
    
    const input = await driver.wait(
      until.elementLocated(By.xpath("//input")),
      10000
    );
    await input.sendKeys(email);

    const button = await driver.wait(
      until.elementLocated(By.xpath('//button[.//span[text()="Дальше"]]')),
      10000
    );
    await button.click();

    await driver.sleep(3000);

    const input2 = await driver.wait(
      until.elementLocated(By.xpath("(//input)[2]")),
      10000
    );
    await input2.sendKeys(password);

    const button2 = await driver.wait(
      until.elementLocated(By.xpath('//button[.//span[text()="Дальше"]]')),
      10000
    );
    await button2.click();

    await driver.sleep(5000);

    const currentUrl = await driver.getCurrentUrl();
    console.log('Current URL after login:', currentUrl);
    
    // Проверяем, не остались ли на странице входа
    if (currentUrl.includes('signin')) {
      await driver.quit();
      return res.status(400).json({ error: "Неверная почта или пароль", is_enter: false });
    }


    const divOperations = await driver.findElements(By.xpath("//div[@class='MuiBox-root css-14223cq']//div[@class='MuiBox-root css-dggkwl']/div[not(@class)]//span[@class='tocfcbQ2']"));
    const title = []

    for (let div of divOperations){
      title.push(await div.getText())
    }



    res.status(200).json({ 
      message: divOperations
    });
    
  } catch (error) {
    console.error('Error in yoomoneyOperation:', error);
    if (driver) {
      await driver.quit()
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
