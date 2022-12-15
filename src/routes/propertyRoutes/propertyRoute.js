const router = require('express').Router()
const getAllPropertyController = require('../../controllers/propertyController/getAllPropertyController')
const getSinglePropertyController = require('../../controllers/propertyController/getSinglePropertyController')
const updatePropertyController = require('../../controllers/propertyController/updatePropertyController')
const deletePropertyController = require('../../controllers/propertyController/deletePropertyController')
const addPropertyController = require('../../controllers/propertyController/addPropertyController')
const addPlot = require('../../controllers/propertyController/addPlotToProperty');
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
// const {imageUpload, videoUpload} = require('../../middleware/multer.js')

// const upload = require('../../services/multer')

router.get('/all', getAllPropertyController )

router.get('/single/:id',getSinglePropertyController )

router.put('/update/:id',verifyToken, updatePropertyController )

router.delete('/delete/:id',verifyToken, deletePropertyController )

router.put('/addplot/:id', verifyAdminToken, addPlot);

router.post('/add',verifyAdminToken,  addPropertyController)
// verifyToken,verifyAdminToken,imageUpload.single('image'), videoUpload.single('video'),
// upload.array('images', 3),

module.exports = router