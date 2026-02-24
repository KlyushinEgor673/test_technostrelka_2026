const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  
  try {

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({ message: "Нет токена или неверный формат" })
    }

    console.log("authHeader:", authHeader)

    const token = authHeader.split(' ')[1]

    if(!token || token === 'undefined'){
      return res.status(401).json({ message: "Нет токена" })
    }

    //проверяем легетимность токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next();
  } catch (error) {
    console.log("Ошибка: ", error)
    return res.status(401).json({ message: "Неверный токен" });
  }
}

module.exports = {authMiddleware};