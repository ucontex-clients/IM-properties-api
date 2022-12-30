const Property = require("../../models/PropertySchema");
const getAproperty = async (req,res,next) => {
  try {
    const { id: _id } = req.params;

    const data = await Property.findOne({ _id }).populate("reviews");

    console.log(data.plotLayout);

    return res.status(200).json({
      status: "success",
      data
    });
  } catch (error) {
    next(error);
  }
};
 module.exports = getAproperty
