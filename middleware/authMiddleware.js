const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    // Тк нас интересуют только методы POST GET PUT DELETE ...
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Нам нужен токен, поэтому делим строку 'Bearer token' и получаем token
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // к req из поля user добавим данные, которые вытащили из этого токена и во всех f-циях этот user будет доступен
    next(); // Чтобы вызвать следующую цепочку middleware
  } catch (error) {
    res.status(401).json({ message: 'Не авторизован' });
  }
};
