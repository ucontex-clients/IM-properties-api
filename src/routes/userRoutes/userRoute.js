const router = require('express').Router()
const getAllUserController = require('../../controllers/userController/getAllUserController')
const getSingleUserController = require('../../controllers/userController/getSingleUserController')
const {updateUserController} = require('../../controllers/userController/updateUserController')
const deleteUserController = require('../../controllers/userController/deleteUserController')


const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')


router.get('/all',verifyToken,verifyAdminToken, getAllUserController )

router.get('/:id',verifyToken,verifyAdminAndUserToken, getSingleUserController )

router.put('/:id',verifyToken,verifyAdminAndUserToken, updateUserController )

router.delete('/:id',verifyToken,verifyAdminAndUserToken, deleteUserController )

// router.put('/upload', uploadFile)

module.exports = router