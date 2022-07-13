const router = require('express').Router()
const getSingleUserController = require('../../controller/userController/getSingleUserController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
router.get('/:id',verifyToken,verifyAdminAndUserToken, getSingleUserController )

module.exports = router