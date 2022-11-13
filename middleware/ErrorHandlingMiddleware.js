const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    // Если класс ошибки ApiError
    return res.status(err.status).json({ message: err.message });
  }
  // Если попала ошибка ,которая не принадлежить ApiError, которую мы никак не обработали, то ->
  return res.status(500).json({ message: 'Непредвиденная ошибка!' });
};
