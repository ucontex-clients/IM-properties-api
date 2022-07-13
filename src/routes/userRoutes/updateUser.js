const router = require('express').Router()
const updateUserController = require('../../controller/userController/updateUserController')

router.put('/:id', updateUserController )

module.exports = router