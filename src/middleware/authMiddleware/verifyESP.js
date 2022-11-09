const verifyToken = require("../authMiddleware/verifyToken");
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (["ESP"].includes(req.user.role)) {
      next();
    }
  });
};
module.exports = verifyAdmin;
