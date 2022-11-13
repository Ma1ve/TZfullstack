const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJwt = (id, email, role) => {
  // Создаем отдельную функцию для удобства создания JWT токена
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};
class UserController {
  // можно обойтись и без класса просто создавать функции, но класс грубо говоря группирует
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или password'));
        // return res.json({ error: 'Некорректный email или password' });
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        // return res.json({ error: 'Пользователь с таким email уже существует' });
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return next(ApiError.internal('Пользователь не найден'));
      // Проверяем есть ли пользователь с таким email
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) return next(ApiError.internal('Указан неверный пароль'));
      // Проверяем совпали ли пароли
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
// На выхоже из этого файла у нас будет создан новый объект из этого класса. Через точку мы будет обращаться к написанным функциям и вызывать их
