const router = require('express').Router()
const getAllUserController = require('../../controller/userController/getAllUserController')

router.get('/all', getAllUserController )

module.exports = router