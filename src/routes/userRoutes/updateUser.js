const router = require('express').Router()
const updateUserController = require('../../controller/userController/updateUserController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
router.put('/:id',verifyToken,verifyAdminAndUserToken, updateUserController )

module.exports = router