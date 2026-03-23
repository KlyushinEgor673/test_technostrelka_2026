const prisma = require("../client");
const { usedCodes, driverStorage, cookieStorage, userData } = require("../utils/tempStorage");
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

//настройка драйвера
const options = new chrome.Options();
options.addArguments('--headless=new');
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--disable-gpu');
options.addArguments('--window-size=1920,1080');


// Обмен токена
const exchangeToken = async (req, res) => {
  console.log(`[${new Date().toISOString()}] POST /api/exchange-token called`);
  console.log(`Request ID: ${Math.random().toString(36).substring(7)}`);

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Код обязателен' });
    }

    if (usedCodes.has(code)) {
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

    if (!data.access_token) {
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

    if (!access_token) {
      return res.status(400).json({
        error: "Токен доступа не найден. Подключите YooMoney аккаунт"
      });
    }

    if (req.query.type) bodyParams.append('type', req.query.type);
    if (req.query.label) bodyParams.append('label', req.query.label);
    if (req.query.from) bodyParams.append('from', req.query.from);
    if (req.query.till) bodyParams.append('till', req.query.till);
    if (req.query.start_record) bodyParams.append('start_record', req.query.start_record);
    if (req.query.records) bodyParams.append('records', req.query.records);
    if (req.query.details) bodyParams.append('details', req.query.details);

    if (bodyParams.toString().length === 0) {
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

    if (!response.ok) {
      return res.status(400).json({ error: response.status });
    }

    const data = await response.json();

    if (data.error) {
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

  try {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ error: "Почта и пароль обязательны" });
    }

    // let driver = driverStorage.get(email)

    // if (driver) {
    //   try {
    //     await driver.getCurrentUrl();
    //     const currentUrl = await driver.getCurrentUrl();
    //     if (!currentUrl.includes('signin') && !currentUrl.includes('confirmation')) {
    //       return res.status(200).json({ message: "Пользователь уже в аккаунте", is_enter: true });
    //     }
    //   } catch (error) {
    //     driverStorage.delete(email);
    //     driver = null;
    //   }
    // }

    // if(!driver){

    // }

    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.get("https://yoomoney.ru/yooid/signin/step/login?origin=Wallet&returnUrl=https%3A%2F%2Fyoomoney.ru%2F");
    await driver.manage().deleteAllCookies();
    driverStorage.set(email, driver);

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

      await prisma.users.update({
        where: { id: req.user.id },
        data: {
          email_ym: email,
          password_ym: password,
          is_enter_ym: false
        }
      })

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
        email_ym: email,
        password_ym: password,
        cookies: cookiesWeb,
        is_enter_ym: true
      }
    });

    await driver.quit()

    res.status(200).json({ message: "Вы вошли в аккаунт yoomoney", is_enter: true })
  } catch (error) {
    if (driver) await driver.quit();
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const checkSessionStatus = async (req, res) => {
  try {
    const email = req.body.email;

    const driver = driverStorage.get(email);
    const cookies = cookieStorage.get(email);

    let driverUrl = null;
    let driverStatus = 'not_found';

    if (driver) {
      try {
        driverUrl = await driver.getCurrentUrl();
        driverStatus = 'active';
      } catch (e) {
        driverStatus = 'dead';
      }
    }

    res.json({
      email,
      driver_exists: !!driver,
      driver_status: driverStatus,
      driver_url: driverUrl,
      cookies_exists: !!cookies,
      cookies_count: cookies ? cookies.length : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    // Вводим код
    const input = await driver.findElement(By.xpath("//input"));
    await input.sendKeys(code);

    await driver.sleep(3000);

    const currentUrl = await driver.getCurrentUrl()

    if (currentUrl.includes('confirmation')) {
      await prisma.users.update({
        where: { id: req.user.id },
        data: {
          is_enter_ym: false
        }
      })
      res.status(400).json({ error: "Неверный код", is_enter: false })
    } else if (currentUrl.includes('main')) {
      await prisma.users.update({
        where: { id: req.user.id },
        data: {
          is_enter_ym: true
        }
      })
      await driver.quit()
      res.status(200).json({ message: "Вы успешно подключили yoomoney", is_enter: true })
    }
  } catch (error) {
    console.error(error)
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


const getYoomoneySubscriptions = async (req, res) => {
  let driver = null;

  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id }
    });

    // if(!user || !user.cookies || user.cookies.length === 0) {
    //   return res.status(400).json({ error: "Нет cookies для входа" });
    // }

    const email = user.email_ym
    const password = user.password_ym

    // Создаем driver
    driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.get("https://yoomoney.ru/yooid/signin/step/login?origin=Wallet&returnUrl=https%3A%2F%2Fyoomoney.ru%2F");

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


    await driver.get("https://yoomoney.ru/cards/subscriptions");

    // 5. Ищем iframe
    const iframe = await driver.wait(
      until.elementLocated(By.tagName("iframe")),
      10000
    );
    await driver.switchTo().frame(iframe);
    await driver.sleep(2000);

    // 6. Парсим подписки
    const divs = await driver.findElements(By.xpath("//div[@class='slide-data']"));
    const subs = [];

    for (let div of divs) {
      const name = await div.findElement(By.xpath(".//div[2]")).getText();
      const days = await div.findElement(By.xpath(".//div[3]")).getText();
      const price = await div.findElement(By.xpath(".//div[4]")).getText();
      const end = await div.findElement(By.xpath(".//div[5]")).getText();
      const img = await div.findElement(By.xpath(".//div[1]//img"));
      const imgSrc = await img.getAttribute('src');

      subs.push({ name: name.trim(), days: days.trim(), price: price.trim(), end: end.trim(), img: imgSrc.trim() });
    }

    res.status(200).json({ subscriptions: subs });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (driver) await driver.quit();
  }
};



// Выход из yoomoney
const yoomoneyLogout = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" })
    }
    if (!user.email_ym || !user.password_ym || user.is_enter_ym === false) {
      return res.status(400).json({ error: "Вы не в аккаунте" })
    }

    await prisma.users.update({
      where: { id: req.user.id },
      data: {
        email_ym: null,
        password_ym: null,
        is_enter_ym: false
      }
    });

    res.status(200).json({ success: "Вы успешно вышли из аккаунта Yoomoney" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  exchangeToken,
  getOperationHistory,
  getOperationDetails,
  yoomoneyLogin,
  checkSessionStatus,
  checkCodeYoomoney,
  getCookies,
  getYoomoneySubscriptions,
  yoomoneyLogout
};