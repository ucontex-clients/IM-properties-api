// const User = require("../../models/User");
// const {TOKEN_SECRET} = require('../../config/constant')
// const jwt = require("jsonwebtoken");

// const verifyToken = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       jwt.verify(token, TOKEN_SECRET, async (err, user) => {
//         if (err) {
//           res
//             .status(401)
//             .json({ error: { message: "Access denied, Invalid token" } });
//         } else {
//           req.user = await User.findOne({ _id: user._id });
//           console.log(req.user);
//           next();
//         }
//       });
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   }
//   if (!token) {
//     res.status(400).json({
//       error: { message: "Access denied, No token for authorization" }
//     });
//   }
// };

// module.exports = verifyToken;


require('dotenv').config();
const jwt = require('jsonwebtoken');
const {TOKEN_SECRET} = require('../../config/constant')
const User = require('../../models/User');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json('Token Missing');
        }

        const decodedToken = await jwt.verify(token, TOKEN_SECRET);
        if (!decodedToken) {
            throw new Error();
        }

        req.user = await User.findById(decodedToken._id);
        next();
    } catch (error) {
        return res.status(401).json('Register as a user!');
    }
};

module.exports = verifyToken;