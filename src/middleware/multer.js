const multer= require('multer')
const path = require("path");
const url = require("url");

console.log(path.parse(path.parse(__dirname).dir).dir);

    //multer
    const fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(path.parse(path.parse(__dirname).dir).dir, "uploads"));
          console.log(req.file)
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + "..." + file.originalname);
          console.log(req.file)
        },
      });
  const upload = multer({ storage: fileStorageEngine });

  module.exports = upload