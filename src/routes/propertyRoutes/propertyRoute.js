const router = require('express').Router()
const getAllPropertyController = require('../../controllers/propertyController/getAllPropertyController')
const getSinglePropertyController = require('../../controllers/propertyController/getSinglePropertyController')
const {updatePropertyController} = require('../../controllers/propertyController/updatePropertyController')
const deletePropertyController = require('../../controllers/propertyController/deletePropertyController')


const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')


router.get('/all',verifyToken,verifyAdminToken, getAllPropertyController )

router.get('/single',verifyToken,verifyAdminAndUserToken, getSinglePropertyController )

router.put('/update',verifyToken,verifyAdminAndUserToken, updatePropertyController )

router.delete('/delete',verifyToken,verifyAdminAndUserToken, deletePropertyController )

// router.put('/upload', uploadFile)

module.exports = router