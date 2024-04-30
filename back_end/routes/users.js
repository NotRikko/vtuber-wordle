const express = require('express');
const user_controller = require('../controllers/userController');
const router = express.Router();

router.post('/user_create_post', user_controller.user_post);

module.exports = router;
