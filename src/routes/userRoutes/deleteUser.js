const router = require('express').Router()
const deleteUserController = require('../../controller/userController/deleteUserController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
router.delete('/:id',verifyToken,verifyAdminAndUserToken, deleteUserController )

module.exports = router