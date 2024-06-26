const express = require('express')
const user_controller = require('../controllers/userController');
const app = require('../app');
const router = express.Router()

router.post('/user_create', user_controller.user_post);
router.post('/login', user_controller.user_validate);
router.post('/logout', user_controller.user_logout);
router.get('/user_session', user_controller.user_session);
router.post('/token', user_controller.user_token);
router.put('/change_username', user_controller.user_change_username);
router.put('/change_password', user_controller.user_change_password);
router.put('/change_picture', user_controller.user_change_picture);
router.put('/update_score', user_controller.user_update_score);

module.exports = router;
