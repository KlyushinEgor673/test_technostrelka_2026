const prisma = require("../client");
const { usedCodes } = require("../utils/tempStorage");
const { Builder, By, until } = require('selenium-webdriver');

// Обмен токена
const exchangeToken = async (req, res) => {
  console.log(`[${new Date().toISOString()}] POST /api/exchange-token called`);
  console.log(`Request ID: ${Math.random().toString(36).substring(7)}`);
  
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Код обязателен' });
    }

    if(usedCodes.has(code)){
      console.log(`Код ${code} уже был использован. Запрос проигнорирован.`)
      return res.status(200).json({ error: "данный код уже использовался" })
    }

    usedCodes.set(code, { inProgress: true, userId: req.user.id })

    console.log(`[${new Date().toISOString()}] Sending request to YooMoney...`);
    
    const response = await fetch('https://yoomoney.ru/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: '6EFCC0255452172DD4C176A7429F2D4F71AFDE69F3EEAA18DFCCA727903F01F2',
        grant_type: 'authorization_code',
        redirect_uri: 'https://localhost.ru:8080',
        client_secret: '455A0A2D77D5F9DC82D86586215E65ECA0255E265B270F7C35A2BE8DC5B314D12A8B2A124C2AB17300A9336BA3DA6BC1F75B2D85B7F0B70E7018EA399D2DCF67'
      })
    });
    
    const data = await response.json();

    if(!data.access_token){
      usedCodes.delete(code)
      return res.status(400).json({ error: "Неверный токен" })
    }

    await prisma.users.update({
      where: { id: req.user.id },
      data: {
        access_token_yoomoney: data.access_token
      }
    })

    usedCodes.set(code, { inProgress: false, success: true, userId: req.user.id })

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// История операций
const getOperationHistory = async (req, res) => {
  try {
    const bodyParams = new URLSearchParams();

    const user = await prisma.users.findUnique({
      where: { id: req.user.id }
    });
    const access_token = user.access_token_yoomoney;

    if(req.query.type) bodyParams.append('type', req.query.type);
    if(req.query.label) bodyParams.append('label', req.query.label);
    if(req.query.from) bodyParams.append('from', req.query.from);
    if(req.query.till) bodyParams.append('till', req.query.till);
    if(req.query.start_record) bodyParams.append('start_record', req.query.start_record);
    if(req.query.records) bodyParams.append('records', req.query.records);
    if(req.query.details) bodyParams.append('details', req.query.details);

    if(bodyParams.toString().length === 0){
      bodyParams.append('records', 100);
    }

    const response = await fetch('https://yoomoney.ru/api/operation-history', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams
    });

    if(!response.ok){
      return res.status(400).json({ error: response.status });
    }

    const data = await response.json();

    if(data.error){
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json({ subscriptions: data });
  } catch (error) {
    console.error('Error getting operation history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Детали операции
const getOperationDetails = async (req, res) => {
  try {
    const { operation_id } = req.body;
    if (!operation_id) {
      return res.status(400).json({ error: "Идентификатор операции обязателен" });
    }

    const user = await prisma.users.findUnique({
      where: { id: req.user.id }
    });
    const access_token = user.access_token_yoomoney;

    const bodyParams = new URLSearchParams();
    bodyParams.append('operation_id', operation_id);

    const response = await fetch('https://yoomoney.ru/api/operation-details', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YooMoney API error:', response.status, errorText);
      return res.status(400).json({ error: `YooMoney API error: ${response.status}` });
    }

    const data = await response.json();
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json({ details: data });
  } catch (error) {
    console.error('Error in operation-details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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

// // Выход из YooMoney
// const yoomoneyLogout = async (req, res) => {
//   try {
//     const user = await prisma.users.findFirst({
//       where: { id: req.user.id },
//     });

//     if(!user.cookies){
//       return res.status(400).json({ error: "Вы не в аккаунте" });
//     }

//     await prisma.users.update({
//       where: { id: user.id },
//       data: {
//         cookies: null
//       }
//     });

//     res.status(200).json({ success: "Вы вышли из аккаунта" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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

// Получение подписок из YooMoney
const getYoomoneySubscriptions = async (req, res) => {
  let driver;
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id }
    });
    const cookies = user.cookies;

    if(!cookies || cookies.length === 0){
      return res.status(400).json({ error: "Отсутствуют cookies" });
    }

    driver = await new Builder().forBrowser('chrome').build();
    await driver.get("https://yoomoney.ru/cards/subscriptions");
    await driver.manage().deleteAllCookies();

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

    await driver.quit();
    res.json(subs);
  } catch (error) {
    if (driver) await driver.quit();
    console.error(error);
    res.status(500).json({ error: 'Failed to parse subscriptions' });
  }
};

module.exports = { 
  exchangeToken,
  getOperationHistory,
  getOperationDetails,
  yoomoneyLogin,
  // yoomoneyLogout,
  getCookies,
  getYoomoneySubscriptions
};