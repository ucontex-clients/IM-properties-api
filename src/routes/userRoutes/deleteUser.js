const router = require('express').Router()
const deleteUserController = require('../../controller/userController/deleteUserController')

router.delete('/:id', deleteUserController )

module.exports = router