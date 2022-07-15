const router = require('express').Router()
const getAllUserController = require('../../controllers/userController/UserController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const getSingleUserController = require('../../controllers/userController/getSingleUserController')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
const updateUserController = require('../../controllers/userController/updateUserController')
const deleteUserController = require('../../controllers/userController/deleteUserController')

router.get('/all',verifyToken,verifyAdminToken, getAllUserController )

router.get('/:id',verifyToken,verifyAdminAndUserToken, getSingleUserController )

router.put('/:id',verifyToken,verifyAdminAndUserToken, updateUserController )

router.delete('/:id',verifyToken,verifyAdminAndUserToken, deleteUserController )

module.exports = router