const prisma = require("../client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { tempStorage } = require("../utils/tempStorage");
const { sendVerificationEmail } = require("../services/email.service");

// Верификация кода
const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email и код обязательны" });
    }

    const tempData = tempStorage.get(email);

    if (!tempData) {
      return res
        .status(400)
        .json({ error: "Попробуйте пройти регистрацию повторно" });
    }

    if (tempData.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Код истек. Запросите новый код" });
    }

    if (tempData.code !== code) {
      return res.status(400).json({ error: "Неверный код" });
    }

    const hashedPassword = await bcrypt.hash(tempData.password, 10);

    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword,
        name: tempData.name,
        surname: tempData.surname,
      },
    });

    tempStorage.delete(email);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      message: "Регистрация успешно завершена",
      token: token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        surname: newUser.surname,
      },
    });
  } catch (error) {
    console.error("Ошибка верификации:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Повторная отправка кода
const resendCode = async (req, res) => {
  /* #swagger.tags = ['code'] */
  /* #swagger.summary = 'Повторная отправка кода' */
  try {
    const { email } = req.body;

    const tempData = tempStorage.get(email);

    if (!tempData) {
      return res.status(404).json({ error: "Запрос на регистрацию не найден" });
    }

    const newCode = Math.floor(1000 + Math.random() * 9000).toString();

    tempData.code = newCode;
    tempData.expiresAt = Date.now() + 5 * 60 * 1000;
    tempStorage.set(email, tempData);

    await sendVerificationEmail(email, newCode);
    console.log(`Новый код ${newCode} отправлен на ${email}`);

    res.status(200).json({ message: "Новый код отправлен" });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Push-уведомление о списании
const pushNotifications = async (req, res) => {
  /* #swagger.tags = ['code'] */
  /* #swagger.summary = 'Push-уведомление о списании' */
  try {

    const subs = await prisma.subscriptions.findMany()

    const currentDate = new Date()

    for(let sub of subs){
      const subEndDate = new Date(sub.end_date)
      
      console.log("===================================");
      console.log("subEndDate: ", subEndDate)
      console.log("currentDate: ", currentDate)

      if((subEndDate.getDate() - currentDate.getDate() < 4)){
        
      }

    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = { verifyCode, resendCode, pushNotifications };