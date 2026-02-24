require('dotenv').config()
const express = require('express');
const prisma = require('./client');
const jwt = require('jsonwebtoken');
const cors = require('cors');

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
  app.post('/api/register', async (req, res) => {

   const { email, password, name, surname } = req.body;

    const users = await prisma.users.create({
      data: {
        email: email,
        password: password,
        name: name,
        surname: surname
      }
    })
    res.status(200).json({ users: users })
  })



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