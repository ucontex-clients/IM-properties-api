const Property = require("../../models/PropertySchema");
const deleteAProperty = async (req,res,next) => {
  try {
    const body = { property: req.params.id };

    const property = await Property.findOneAndDelete(body);

    return res.status(200).json({
      status: "success",
      message: "Property deleted successfully"
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = deleteAProperty
