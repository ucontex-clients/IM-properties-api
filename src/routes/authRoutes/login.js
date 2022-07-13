const router = require('express').Router()
const loginController = require('../../controllers/authController/loginUserController')
router.post('/login', loginController )

module.exports = router