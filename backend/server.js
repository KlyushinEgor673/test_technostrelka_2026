require('dotenv').config()
const express = require('express');
const prisma = require('./client');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


const app = express();

async function main(){
  
  app.use(cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true
  }))

  app.use(express.json())

  app.get('/api/test', async (req, res) => {
    res.status(200).json({ message: "success" })
  })

  

  //регистрация
  const userDataArray = []
  setTimeout(() => {
    userDataArray[4] = ""
  }, 5 * 60 * 1000)

  app.post('/api/register', async (req, res) => {

    try{
      const { email, password, name, surname } = req.body;

      if(!email || !password || !name || !surname){
        return res.status(400).json({ error: "Все поля обязательно" })
      }

      const existingUser = await prisma.users.findFirst({
        where: { email: email }
      });

      if (existingUser) {
        return res.status(409).json({ error: "Пользователь с таким email уже существует" });
      } 

      const randDigit1 = Math.floor(Math.random() * 10)
      const randDigit2 = Math.floor(Math.random() * 10)
      const randDigit3 = Math.floor(Math.random() * 10)
      const randDigit4 = Math.floor(Math.random() * 10)
      const code = `${randDigit1}${randDigit2}${randDigit3}${randDigit4}`

      userDataArray.push(email, password, name, surname, code)

      const emailResult = sendVerificationEmail(userDataArray[0], userDataArray[4])

      res.status(200).json({ message: "Код отправлен", emailResult: emailResult })

    } catch(error){
      console.error('Ошибка регистрации: ', error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }

    

  })








  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Функция отправки письма с кодом
  async function sendVerificationEmail(userEmail, verificationCode) {
    try {
      const mailOptions = {
        from: '"Мониторинг подписок" <your-email@gmail.com>',
        to: userEmail,
        subject: 'Код подтверждения',
        text: `Ваш код подтверждения: ${verificationCode}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Подтверждение email</h2>
            <p>Ваш код подтверждения:</p>
            <h1 style="color: #4CAF50; font-size: 32px;">${verificationCode}</h1>
            <p>Код действителен в течение 10 минут.</p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Письмо отправлено:', info.messageId);
      return { success: true, messageId: info.messageId };
      
    } catch (error) {
      console.error('Ошибка отправки:', error);
      return { success: false, error: error.message };
    }
  }







  //получение кода
  app.get('/verify-email', async (req, res) => {
    
    

  })



  app.post('/api/enter', async (req, res) => {

    const {email, password} = req.body


    const logUser = await prisma.users.findFirst({
      where: {
        email: email,
        password: password
      }
    })

    if(!logUser){
      throw new Error("Неверные учётные данные")
    }

    const token = jwt.sign({ id: logUser.id }, process.env.JWT_SECRET);
    res.status(200).json({token: token, logUser: logUser})

  })

  const PORT = process.env.PORT

  app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`)
  })

}

main()