// const Property = require('../../models/PropertySchema')
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '../images')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now()+ '--' + file.originalname)
    }
})
const upload = multer({storage:fileStorageEngine})
res.status(200).json({mesage: 'Multiple Files Upload Succesfull'})
// const uploadFile =  (req, res) =>{
//     upload.array('images',5)
//     console.log(req.file)
//     res.status(200).json({mesage: 'Multiple Files Upload Succesfull'})
// }

module.exports = upload