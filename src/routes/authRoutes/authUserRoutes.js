const router = require('express').Router()
const authController = require('../../controllers/authController/authUserController')


router.post('/register', authController.registerControllers );

router.post('/login', authController.loginController )

module.exports = router;