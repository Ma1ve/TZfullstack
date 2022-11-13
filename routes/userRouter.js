const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.login); // 2-ым параметром передаём соответствующую функцию
router.post('/register', userController.registration);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;
