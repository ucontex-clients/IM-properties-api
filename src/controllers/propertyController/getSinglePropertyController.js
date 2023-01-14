const Property = require("../../models/PropertySchema");
const getAproperty = async (req,res,next) => {
  try {
    const { id: _id } = req.params;

    const data = await Property.findOne({ _id }).populate("reviews");


    const prices = data.plotLayout.map(dat => dat.price);
    const maximumPrice = Math.max(...prices);
    const minimumPrice = Math.min(...prices);

    const newData = {
      data,
      maximumPrice,
      minimumPrice
    };

    console.log(newData);

    return res.status(200).json({
      status: "success",
      message: newData
    });
  } catch (error) {
    next(error);
  }
};
 module.exports = getAproperty
