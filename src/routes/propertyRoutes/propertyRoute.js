const router = require('express').Router()
const getAllPropertyController = require('../../controllers/propertyController/getAllPropertyController')
const getSinglePropertyController = require('../../controllers/propertyController/getSinglePropertyController')
const {updatePropertyController} = require('../../controllers/propertyController/updatePropertyController')
const deletePropertyController = require('../../controllers/propertyController/deletePropertyController')
const addPropertyController = require('../../controllers/propertyController/addPropertyController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
// const upload = require('../../services/multer')

router.get('/all',verifyToken,verifyAdminToken, getAllPropertyController )

router.get('/single',verifyToken,verifyAdminAndUserToken, getSinglePropertyController )

router.put('/update',verifyToken,verifyAdminAndUserToken, updatePropertyController )

router.delete('/delete',verifyToken,verifyAdminAndUserToken, deletePropertyController )

router.post('/add', verifyToken,verifyAdminToken, addPropertyController)


module.exports = router