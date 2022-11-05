const cloudinary = require("cloudinary");
const  constant  = require ( "../config/constant");
cloudinary.v2.config({
  cloud_name: constant.CLOUDINARY_NAME,
  api_key: constant.CLOUDINARY_KEY,
  api_secret: constant.CLOUDINARY_SECRET
});

const cloudinaryConfig = async (file) => {
  const config = {};

  const response = await cloudinary.v2.uploader.upload(file, config);
  return response;
};

module.exports = cloudinaryConfig
