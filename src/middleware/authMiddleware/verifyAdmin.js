// const verifyToken = require("../authMiddleware/verifyToken");
// const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (["admin"].includes(req.user.role)) {
//       next();
//     }
//   });
// };
// module.exports = verifyAdmin;

const Admin = require("../../models/adminSchema");
const {TOKEN_SECRET} = require('../../config/constant')
const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, TOKEN_SECRET, async (err, admin) => {
        if (err) {
          res
            .status(401)
            .json({ error: { message: "Access denied, Invalid token" } });
        } else {
          req.admin = await Admin.findOne({ _id: admin._id });
          // console.log(req.user);
          next();
        }
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
  if (!token) {
    res.status(400).json({
      error: { message: "Access denied, No token for authorization" }
    });
  }
};

module.exports = verifyAdmin;