import { driverStorage } from "../utils/tempStorage";

// Вход в YooMoney
const yoomoneyLogin = async (req, res) => {
  let driver;
  try {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
      return res.status(400).json({ error: "Почта и пароль обязательны" });
    }

    // const user = await prisma.users.findFirst({
    //   where: { email: email },
    // });

    // if (!user) {
    //   return res.status(400).json({ error: "Неверная почта" });
    // }
    // if(user.cookies){
    //   return res.status(400).json({ error: "Вы уже в аккаунте" });
    // }
    
    driver = await new Builder().forBrowser('chrome').build();

    await driver.get("https://yoomoney.ru/yooid/signin/step/login?origin=Wallet&returnUrl=https%3A%2F%2Fyoomoney.ru%2F");

    await driver.manage().deleteAllCookies();

    try {
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

      if (currentUrl.includes('signin')) {
        await driver.quit();
        return res.status(400).json({ error: "Неверная почта или пароль" });
      }

      await driver.sleep(2000);
    } catch (error) {
      console.error(error);
      if (driver) await driver.quit();
      return res.status(400).json({ error: "Неверная почта или пароль" });
    }

    const cookiesWeb = await driver.manage().getCookies();

    const authCookies = cookiesWeb.filter(c => 
      ['__zzatw-ymoney', 'DAT', 'DL'].includes(c.name)
    );
    
    if (authCookies.length === 0) {
      await driver.quit();
      return res.status(400).json({ error: "Не удалось войти в аккаунт" });
    }

    await prisma.users.update({
      where: { id: req.user.id },
      data: {
        cookies: cookiesWeb
      }
    });

    const user = await prisma.users.findMany({
      where: {email: email}
    })
    const cookies = user.cookies;

    if(!cookies || cookies.length === 0){
      return res.status(400).json({ error: "Отсутствуют cookies" });
    }

    await driver.get("https://yoomoney.ru/cards/subscriptions");

    for (let cookie of cookies) {
      await driver.manage().addCookie(cookie);
    }

    await driver.navigate().refresh();

    const iframe = await driver.wait(
      until.elementLocated(By.tagName("iframe")),
      10000
    );

    await driver.switchTo().frame(iframe);

    const divs = await driver.wait(
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

    if (driver) await driver.quit();

    res.json(subs);
  } catch (error) {
    if (driver) await driver.quit();
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};