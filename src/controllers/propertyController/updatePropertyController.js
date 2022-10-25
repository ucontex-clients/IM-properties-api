const Property = require("../../models/PropertySchema");

//update property logic
const updatePropertyController = async (req, res) => {
  try {
    // uploadFile(req, res);
    let { body, file } = req;
    // body.image = file.path;
    const update = await Property.findByIdAndUpdate(
      req.params.id,
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
