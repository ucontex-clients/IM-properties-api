const router = require('express').Router()
const {getAllUserController,getSingleUserController,updateUserController,deleteUserController} = require('../../controllers/userController/UserController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')


router.get('/all',verifyToken,verifyAdminToken, getAllUserController )

router.get('/:id',verifyToken,verifyAdminAndUserToken, getSingleUserController )

router.put('/:id',verifyToken,verifyAdminAndUserToken, updateUserController )

router.delete('/:id',verifyToken,verifyAdminAndUserToken, deleteUserController )

module.exports = router