const router = require('express').Router()
const getAllPropertyController = require('../../controllers/propertyController/getAllPropertyController')
const getSinglePropertyController = require('../../controllers/propertyController/getSinglePropertyController')
const {updatePropertyController} = require('../../controllers/propertyController/updatePropertyController')
const deletePropertyController = require('../../controllers/propertyController/deletePropertyController')
const addPropertyController = require('../../controllers/propertyController/addPropertyController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
// const {imageUpload, videoUpload} = require('../../middleware/multer.js')

// const upload = require('../../services/multer')

router.get('/all',verifyToken,verifyAdminToken, getAllPropertyController )

router.get('/single/:id',verifyToken,verifyAdminAndUserToken, getSinglePropertyController )

router.put('/update/:id',verifyToken,verifyAdminAndUserToken, updatePropertyController )

router.delete('/delete/:id',verifyToken,verifyAdminAndUserToken, deletePropertyController )

router.post('/add',verifyToken,  addPropertyController)
// verifyToken,verifyAdminToken,imageUpload.single('image'), videoUpload.single('video'),
// upload.array('images', 3),

module.exports = router