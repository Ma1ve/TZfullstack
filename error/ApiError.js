class ApiError extends Error {
  // класс будет расширять Error
  // создаю универсальный handler, который будет обрабатывать ошибки
  constructor(status, message) {
    // конструктор получает статус код и сообщение, которое мы будем возвращать на клиент
    super();
    this.status = status;
    this.message = message;
  }

  // Создаю пару статичных функций под разные статус коды

  static badRequest(message) {
    return new ApiError(404, message);
  }

  static internal(message) {
    return new ApiError(505, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
