// const cloudinaryConfig = require("../config/cloudinaryConfig")
// const DatauriParser = require("datauri/parser")
// const {extname} = require("path")
// const parser = new DatauriParser();

// const uploads = async function uploads(body) {
//   const buffer = body.buffer;
//   // console.log(buffer)
//   const ext = extname(body.originalname);
//   const uri = parser.format(ext, buffer);

//   const result = await cloudinaryConfig(uri.content);
//   const media = {
//     asset_id: result.asset_id,
//     public_id: result.public_id,
//     type: result.resource_type,
//     imageURL: result.secure_url,
//     size: result.bytes
//   };

//   return media;
// };

const{ cloud} = require('../config/cloudinary2');

exports.uploads = files => {
  let result;
  
  files.forEach(async(file) => {
    result = await cloud(file.path);
  });

  console.log('================result');
  console.log(JSON.stringify(result));
  return result;
};