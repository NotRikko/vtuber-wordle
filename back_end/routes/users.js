const express = require('express')
const user_controller = require('../controllers/userController');
const app = require('../app');
const router = express.Router()

router.post('/', user_controller.user_post);
router.post('/login', user_controller.user_validate);
router.delete('/logout', user_controller.user_logout);
router.get('/user_session', user_controller.user_session);
router.post('/token', user_controller.token);

module.exports = router;
