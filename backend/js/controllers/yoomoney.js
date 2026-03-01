
const prisma = require('../client')
const driverStorage = require('../utils/tempStorage');
const { Builder, By, until } = require('selenium-webdriver')


// Вход в YooMoney
const yoomoneyLogin = async (req, res) => {

  try {

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
      return res.status(400).json({ error: "Почта и пароль обязательны" });
    }

    let driver = driverStorage.get(email)

    if (driver) {
      try {
        await driver.getCurrentUrl();
        const currentUrl = await driver.getCurrentUrl();
        if (!currentUrl.includes('signin') && !currentUrl.includes('confirmation')) {
          return res.status(200).json({ message: "Пользователь уже в аккаунте", is_enter: true });
        }
      } catch (error) {
        driverStorage.delete(email);
        driver = null;
      }
    }

    if(!driver){
      driver = await new Builder().forBrowser('chrome').build();
      await driver.get("https://yoomoney.ru/yooid/signin/step/login?origin=Wallet&returnUrl=https%3A%2F%2Fyoomoney.ru%2F");
      await driver.manage().deleteAllCookies();
      driverStorage.set(email, driver);
    }
    
    await driver.sleep(2000);

    const input = await driver.findElement(By.xpath("//input"));
    await input.sendKeys(email);

    const button = await driver.findElement(
      By.xpath('//button[.//span[text()="Дальше"]]')
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

    if (currentUrl.includes('confirmation')) {
      const cookiesCurrentSession = await driver.manage().getCookies();
      cookieStorage.set(email, cookiesCurrentSession);
      driverStorage.set(email, driver)
      return res.status(400).json({ error: "Необходим код подтверждения", is_enter: false, required_code: true });
    }

    if (currentUrl.includes('signin')) {
      await driver.quit();
      driverStorage.delete(email)
      return res.status(400).json({ error: "Неверная почта или пароль", is_enter: false });
    }

    const cookiesWeb = await driver.manage().getCookies();

    const authCookies = cookiesWeb.filter(c => 
      ['__zzatw-ymoney', 'DAT', 'DL'].includes(c.name)
    );
    
    if (authCookies.length === 0) {
      await driver.quit();
      driverStorage.delete(email);
      return res.status(400).json({ error: "Не удалось войти в аккаунт" });
    }

    await prisma.users.update({
      where: { id: req.user.id },
      data: {
        cookies: cookiesWeb
      }
    });

    res.status(200).json({ message: "Вы вошли в аккаунт yoomoney", is_enter: true})
  } catch (error) {
    if (driver) await driver.quit();
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const checkCodeYoomoney = async (req, res) => {
  try {
    const email = req.body.email
    const code = req.body.code

    if (!email || !code) {
      return res.status(400).json({ 
        error: "Email и код обязательны" 
      });
    }

    let driver = driverStorage.get(email)

    if (!driver) {
      return res.status(400).json({ 
        error: "Сессия не найдена, войдите заново",
        requires_login: true 
      });
    }

    // Проверяем, жив ли driver
    try {
      await driver.getCurrentUrl();
    } catch (error) {
      driverStorage.delete(email);
      cookieStorage.delete(email);
      return res.status(400).json({ 
        error: "Сессия истекла, войдите заново",
        requires_login: true 
      });
    }

    // Получаем сохраненные cookies
    const savedCookies = cookieStorage.get(email);
    if (savedCookies && savedCookies.length > 0) {
      for (let cookie of savedCookies) {
        try {
          await driver.manage().addCookie(cookie);
        } catch (e) {
          console.log('Error adding cookie:', e);
        }
      }
      await driver.navigate().refresh();
      await driver.sleep(2000);
    }

    // Вводим код
    const input = await driver.findElement(By.xpath("//input"));
    await input.sendKeys(code);

    const button = await driver.findElement(
      By.xpath('//button[.//span[text()="Дальше"]]')
    );
    await button.click();
    
    await driver.sleep(3000);

    const currentUrl = driver.getCurrentUrl()

    if(currentUrl.includes('confirmation')) {
      res.status(400).json({ error: "Неверный код", is_enter: false })
    } else if (currentUrl.includes('main')) {
      res.status(200).json({ message: "Вы успешно подключили yoomoney", is_enter: true })
    }
  } catch (error) {
    concole.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}



// Получение cookies
const getCookies = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: { id: req.user.id },
    });

    res.status(200).json({ cookies: user.cookies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getSubscriptionYoomoney = async (req, res) => {
  try {
    const user = await prisma.users.findMany({
      where: {id: req.user.id}
    })
    const cookies = user.cookies;

    if(!cookies || cookies.length === 0){
      return res.status(400).json({ error: "Отсутствуют cookies" });
    }

    const globalDriver = await new Builder().forBrowser('chrome').build();
    await globalDriver.get("https://yoomoney.ru/cards/subscriptions");

    for (let cookie of cookies) {
      await globalDriver.manage().addCookie(cookie);
    }

    await globalDriver.navigate().refresh();

    const iframe = await globalDriver.wait(
      until.elementLocated(By.tagName("iframe")),
      10000
    );

    await globalDriver.switchTo().frame(iframe);

    const divs = await globalDriver.wait(
      until.elementsLocated(By.xpath("//div[@class='slide-data']")),
      10000
    );

    const subs = [];

    for (let div of divs) {
      const name = await div.findElement(By.xpath(".//div[2]")).getText();
      const days = await div.findElement(By.xpath(".//div[3]")).getText();
      const price = await div.findElement(By.xpath(".//div[4]")).getText();
      const end = await div.findElement(By.xpath(".//div[5]")).getText();

      subs.push({
        name,
        days,
        price,
        end
      });
    }

    if (globalDriver) await globalDriver.quit();

    res.status(200).json({ subscription: subs });
  } catch (error) {
    console.error("Ошибка при получении подписок", error)
    res.status(400).json({ message: "Ошибка при получении подписок", error: error })
  }
}