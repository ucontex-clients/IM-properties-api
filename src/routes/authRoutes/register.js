const router = require('express').Router()
const registerController = require('../../controllers/authController/registerController')

router.post('/register', registerController )

module.exports = router