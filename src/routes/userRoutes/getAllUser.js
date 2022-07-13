const router = require('express').Router()
const getAllUserController = require('../../controller/userController/getAllUserController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
router.get('/all',verifyToken,verifyAdminToken, getAllUserController )

module.exports = router