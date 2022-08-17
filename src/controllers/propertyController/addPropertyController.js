const Property = require("../../models/PropertySchema");
const slugify = require("slugify");
const validatePropertySchema = require("../../utils/validatePropertiesSchema");

const addPropertyController = async (req, res) => {
  try {
    //multer
    const fileStorageEngine = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./images");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "..." + file.originalname);
      }
    });
    const upload = multer({ storage: fileStorageEngine });

    let { body, file } = req;
    const { error, value } = validatePropertySchema(body);
    if (error) {
      return res.json({ error: { message: error.details[0].message } });
    }

    body.images = file.path;
    const { _id } = req.user;
    console.log(_id);

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

module.exports = addPropertyController;
