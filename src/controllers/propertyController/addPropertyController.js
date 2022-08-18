const Property = require("../../models/PropertySchema");
const slugify = require("slugify");
const validatePropertySchema = require("../../utils/validatePropertiesSchema");
// const upload = require('../../middleware/multer.js')


const addPropertyController = async (req, res) => {
  try {
    let { body, files } = req;
    const { error, value } = validatePropertySchema(body);
    if (error) {
      return res.json({ error: { message: error.details[0].message } });
    }

    body.images = files.path;
    const { _id } = req.user;
    // console.log(_id);
    console.log(files)

    body.nameSlug = slugify(body.name);
    body.catSlug = slugify(body.category);

    const preProperty = new Property({ ...body, addedBy: _id });
    // console.log(preProduct);
    const property = await preProperty.save();
    return res.status(201).json(property);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {addPropertyController}
