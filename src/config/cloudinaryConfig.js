const cloudinary = require("cloudinary").v2;
const  constant  = require ( "../config/constant");
cloudinary.config({
  cloud_name: constant.CLOUDINARY_NAME,
  api_key: constant.CLOUDINARY_KEY,
  api_secret: constant.CLOUDINARY_SECRET
});

module.exports = { cloudinary };

