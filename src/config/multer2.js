const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // cb(null, `${__dirname}/public`)
    cb(null, path.join(__dirname, '..', 'public'));
  },

  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'mp4') {
    cb(null, true)
  } 

  else {
    // Reject File
    cb({ message: 'Unsupported File format'}, false)
  }
};

exports.uploads = multer({
  storage: storage,
  fileFilter: fileFilter
});