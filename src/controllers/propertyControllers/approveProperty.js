const Property = require("../../models/PropertySchema");
const approveAProperty = async (req, res, next) => {
  try {
    const _id = req.params.id;
    if(req.body.status === "approved"|| req.body.status ==="declined" ){
      const property = await Property.findOneAndUpdate(
        { _id},
        { status: req.body.status },
        { new: true }
      )
      return res.status(200).json({
          status: "success",
          data: property
        })
    }else{
      return res.status(400).json({
        error: { status: "fail", message: "action not allowed" }
      });
    }
    
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = approveAProperty
