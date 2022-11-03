const Property = require("../../models/PropertySchema");
const Category = require("../../models/CategorySchema");
const slugify = require("slugify");
const validatePropertySchema = require("../../utils/validatePropertiesSchema");
// const upload = require('../../middleware/multer.js')


const addNewProperty = async (req, res, next) => {
  try {
    console.log(req.body);
    const { error, value } = validatePropertySchema(req.body);
    console.log(value);

    if (error) {
      console.log("here-2");
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    let imagesURLs = [];
    let imagesMedia = [];

    const files = req.files;
    console.log(files);
    if (files && files.length > 0) {
      for (let file of files) {
        const media = await uploads(file);
        console.log(imagesURLs);
        imagesURLs.push(media.imageURL);
        imagesMedia.push(media);
      }
    } else {
      return res.status(401).json({
        error: { message: "At least one image must be uploaded" }
      });
    }
    value.imagesMedia = imagesMedia;
    value.imagesURLs = imagesURLs;

    value.name =
      value.name[0].toUpperCase() + value.name.substr(1).toLowerCase();

    let count = 0;
    let slug = slugify(value.name, { lower: true });
    value.nameSlug = slug;
    // value.location = JSON.parse(value.location);
    while (true) {
      const isProperty = await Property.findOne({ nameSlug: value.nameSlug });
      if (!isProperty) break;
      count++;
      value.nameSlug = slug + "-" + count;
    }
    if (value.features) {
      if (value?.features.type == "string") {
        value.features = [value.features];
      } else {
        value.features = Array.from(new Set(value.features));
      }
    }

    console.log(value);

    //@ts-ignore
    value.uploadedBy = req.user._id;
    value.location = {
      state: value.state,
      LGA: value.LGA,
      city: value.city,
      address: value.address
    };

    const property = await Property.create(value);
    return res.status(200).json({
      status: "success",
      data: property
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = addNewProperty