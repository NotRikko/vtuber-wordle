const express = require('express')
const users_controller = require('../controllers/usersController')
const app = require('../app')
const router = express.Router()

router.get('/', users_controller.all_users)

module.exports = router;