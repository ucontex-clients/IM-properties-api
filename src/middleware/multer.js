const multer= require('multer')
const path = require("path");
// const url = require("url");

console.log(path.parse(path.parse(__dirname).dir).dir);

    //multer image
    const fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(path.parse(path.parse(__dirname).dir).dir, "uploads")); 
        },
        
        filename: (req, file, cb) => {
          cb(null, Date.now() + "..." + file.originalname);
        },
      });

     // Video Upload
const videoStorage = multer.diskStorage({
  destination: 'videos', // Destination to store video 
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
      fileSize: 50000000   // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(mp4|MPEG-4)$/)) {     // upload only mp4 and mkv format
          return cb(new Error('Please upload a Video'))
      }
      cb(undefined, true)
  }
})

// app.post('/uploadVideo', videoUpload.single('video'), (req, res) => {
//   res.send(req.file)
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message })
// })
    
  const imageUpload = multer({ storage: fileStorageEngine },(res) =>{
    res.status(200).json('image upload successful')
  });

  

  module.exports = {imageUpload, videoUpload}