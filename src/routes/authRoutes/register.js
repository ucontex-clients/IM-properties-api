const router = require('express').Router()
const registerController = require('../../controllers/authController/registerUserController')

router.post('/register', registerController )

module.exports = router