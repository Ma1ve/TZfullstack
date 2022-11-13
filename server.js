require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 8888;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); // устанавливается подключение к бд, тк f-ция асинронная, вызываем await
    sequelize.sync(); // функция сверяет состояние БД со схемой данных
    app.listen(PORT, () => {
      console.log(`Server is start on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
