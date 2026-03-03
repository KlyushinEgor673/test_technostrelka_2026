const prisma = require("../client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { tempStorage } = require("../utils/tempStorage");
const { sendVerificationEmail } = require("../services/email.service");

// Регистрация
const register = async (req, res) => {
  try {
    const { email, password, name, surname } = req.body;

    if (!email || !password || !name || !surname) {
      return res.status(400).json({ error: "Все поля обязательно" });
    }

    const existingUser = await prisma.users.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Пользователь с таким email уже существует" });
    }

    if (tempStorage.has(email)) {
      return res.status(429).json({ error: "Код уже был отправлен" });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    tempStorage.set(email, {
      code: code,
      password: password,
      name: name,
      surname: surname,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendVerificationEmail(email, code);

    console.log(`Код ${code} отправлен на ${email}`);

    res.status(200).json({
      message: "Код подтверждения отправлен на email",
      email: email,
    });
  } catch (error) {
    console.error("Ошибка регистрации: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Вход
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Неверные учётные данные" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
    );

    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.error("Ошибка входа:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Редактирование профиля
const editProfile = async (req, res) => {
  try {
    const { name, surname } = req.body;

    if(!name || !surname){
      return res.status(400).json({ error: "Все поля должны быть заполнены" })
    }

    const user = await prisma.users.update({
      where: { id: req.user.id },
      data: {
        name: name,
        surname: surname
      }
    });

    res.status(200).json({ status: "success" })
  } catch (error) {
    console.log("Ошибка: ", error);
    res.status(500).json({ error: "Internal server error" })
  }
};



// Изменение почты пользователя
const editEmail = async (req, res) => {
  try {

    const email = req.body.email


  } catch (error) {
    console.log("Ошибка: ", error);
    res.status(500).json({ error: "Internal server error" })
  }
}

// Изменение пароля пользователя
const editPassword = async (req, res) => {
  try {

    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    if(!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Введите все данные" })
    }

    const user = await prisma.users.findUnique({
      where: { id: req.user.id }
    })
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" })
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if(!isOldPasswordValid){
      return res.status(400).json({ error: "Неверный пароль" })
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10)

    const updateUser = await prisma.users.update({
      where: { id: req.user.id },
      data: { 
        password: newHashPassword  
      }
    })

    if (!updateUser) {
      return res.status(404).json({ error: "Пользователь не найден" })
    }

    res.status(200).json({ message: "Пароль изменён" })
  } catch (error) {
    console.log("Ошибка: ", error);
    res.status(500).json({ error: "Internal server error" })
  }
}



// Получение текущего пользователя
const getMe = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
    });

    if(!user){
      return res.status(400).json({ error: "Пользователь не найден" })
    }
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        created_at: user.created_at,
        is_enter_ym: user.is_enter_ym
      },
    });
  } catch (error) {
    console.log("Ошибка", error);
    res.status(500).json({ error: "Internal server error" })
  }
};

module.exports = { 
  register, 
  login, 
  editProfile, 
  editEmail, 
  editPassword, 
  getMe 
}; 