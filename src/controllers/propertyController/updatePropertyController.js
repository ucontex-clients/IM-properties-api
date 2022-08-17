const Property = require("../../models/PropertySchema");
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  }
});
const upload = multer({ storage: fileStorageEngine });

const uploadFile = (req, res) => {
  upload.array("images", 5);
  console.log(req.file);
  res.status(200).json({ mesage: "Image Upload Succesfull" });
};
//update property logic
const updatePropertyController = async (req, res) => {
  try {
    uploadFile(req, res);
    let { body, file } = req;
    body.image = file.path;
    const update = await Property.findByIdAndUpdate(
      req.user._id,
      {
        $set: body
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Update Successful", updated: body, update });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

module.exports = { updatePropertyController };
