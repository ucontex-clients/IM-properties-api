const cloudinary = require("cloudinary").v2;
const  constant  = require ( "../config/constant");
cloudinary.config({
  cloud_name: constant.CLOUDINARY_NAME,
  api_key: constant.CLOUDINARY_KEY,
  api_secret: constant.CLOUDINARY_SECRET
});

// exports.cloud = async(file) => {
//   try {
//     const details = await cloudinary.uploader.upload(file);
//     if(details){
//       console.log("====================================Details");
//       console.log(details)
//       return details;
//     }
//   } catch (error) {
//     console.log(error.message)
//   }
// }

module.exports = cloudinary;