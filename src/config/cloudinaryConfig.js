const cloudinary = require("cloudinary");
const { constant } = require ( "./constant");
cloudinary.v2.config({
  cloud_name: constants.CLOUDINARY_NAME,
  api_key: constants.CLOUDINARY_KEY,
  api_secret: constants.CLOUDINARY_SECRET
});

const cloudinaryConfig = async (file) => {
  const config = {};

  const response = await cloudinary.v2.uploader.upload(file, config);
  return response;
};

module.exports = cloudinaryConfig
