// const Property = require("../../models/PropertySchema");
// export const getAllProperties = async (req,res,next) => {
//   try {
//     console.log("here");
//     let {
//       limit = 20,
//       page = 1,
//       user: uploadedBy
//     }: { page?: number; limit?: number; user?: string } = req.query;
//     page = page || 1;
//     const skip: number = page ? (page - 1) * limit : 0;
//     let option: { cat?: string; uploadedBy?: string } = uploadedBy
//       ? { uploadedBy }
//       : {};
//     console.log(option);

//     const count = await Property.find(option).countDocuments();
//     // const pages = count>0?Math.ceil(count / limit)?Math.ceil(count / limit): 1;
//     let pages = 0;
//     if (count > 0) {
//       if (limit) {
//         pages = Math.ceil(count / limit);
//       } else {
//         pages = 1;
//       }
//     }
//     const result { next, previous} = {};
//     limit = limit - 0;

//     if (page * 1 < pages) {
//       result.next = { limit, page: page * 1 + 1 };
//     }
//     if (page * 1 <= pages && page - 1 != 0) {
//       result.previous = { limit, page: page - 1 };
//     }

//     const properties = await Property.find(option)
//       .populate("uploadedBy")
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip(skip);
//     return res.status(200).json({
//       status: "success",
//       data: { ...result, count, pages, properties }
//     });
//   } catch (error) {
//     next(error);
//   }
// };
