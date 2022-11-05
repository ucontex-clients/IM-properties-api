const Property = require("../../models/PropertySchema");
const  updatePropertyValidator  = require("../../utils/validateUpdateProperty");
const slugify = require("slugify");
// import { uploads } from "../../utils";

const updateAProperty = async (req,res,next) => {
  try {
    const { error, value } = updatePropertyValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    const { id: _id } = req.params;
    let imagesURLs = [];
    let imagesMedia = [];

    const files = req.files;
    if (files && files.length > 0) {
      for (let file of files) {
        const media = await uploads(file);
        console.log(imagesURLs);
        imagesURLs.push(media.imageURL);
        imagesMedia.push(media);
      }
    }
    value.newMedia = imagesMedia;
    value.newImagesURLs = imagesURLs;
    const oldProperty = await Property.findOne({ _id });
    //@ts-ignore
    if (oldProperty.name !== value.name) {
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
    }

    if (value.amenities) {
      if (value?.amenities.type == "string") {
        value.amenities = [value.amenities];
      } else {
        value.amenities = Array.from(new Set(value.amenities));
      }
    }

    //@ts-ignore
    value.location = {
      state: value.state,
      LGA: value.LGA,
      city: value.city,
      address: value.address
    };

    const property = await Property.findOneAndUpdate(
      { _id },
      {
        ...value,
        $push: { imagesURLs: value.newImagesURLs, imagesMedia: value.newMedia }
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: property
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = updateAProperty