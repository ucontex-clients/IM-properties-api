const cloudinaryConfig = require("../config/cloudinaryConfig")
const DatauriParser = require("datauri/parser")
const {extname} = require("path")
const parser = new DatauriParser();

const uploads = async function uploads(body) {
  const buffer = body.buffer;
  // console.log(buffer)
  const ext = extname(body.originalname);
  const uri = parser.format(ext, buffer);

  const result = await cloudinaryConfig(uri.content);
  const media = {
    asset_id: result.asset_id,
    public_id: result.public_id,
    type: result.resource_type,
    imageURL: result.secure_url,
    size: result.bytes
  };

  return media;
};

module.exports = uploads