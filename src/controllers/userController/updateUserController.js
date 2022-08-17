const User = require("../../models/User");
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
  upload.single("image");
  console.log(req.file);
  res.status(200).json({ mesage: "File Upload Succesfull" });
};

const updateUserController = async (req, res) => {
  try {
    uploadFile(req, res);
    let { body, file } = req;
    body.image = file.path;
    const update = await User.findByIdAndUpdate(
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

module.exports = { updateUserController };
