const express = require('express');
const router = express.Router();
// const { uploadPhotos } = require('../../config/multer');
const { cloudinary } = require('../../config/cloudinaryConfig');
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const fs = require('fs');
const BankTransfer = require('../../models/BankTransferSchema');
const moment = require('moment');
const PaymentController  = require("../../controllers/transactionController/addPaymentTransaction");


router.post('/payment/:property/:transaction_url', verifyToken, PaymentController.outrightPayment);
router.post('/payment/:property/:transaction_url', verifyToken, PaymentController.installmentalpayment);



// router.post('/offlinepayment/:property', uploadPhotos.single('receipt'), async (req, res) => {
//   const {_id} = req.user;
//   const property = req.params.property;
//   let file = req.file.path;
//   try {
//     if(!req.file){
//       console.log('Upload a valid Bank Receipt');
//       return res.status(404).json('Please add a valid Bank receipt');
//     }
//     const upload = await cloudinary.uploader.upload(file);
//     const { mode, duration } = req.body;

//     const uploadedReceipt = await BankTransfer.create({
//       Payer: _id,
//       Property: property,
//       uploadUrl: upload.public_id,
//       mode,
//       duration
//     });

//     if(!uploadedReceipt){
//       console.log('Failed to update Bank Receipt payment');
//       return res.status(404).json('Failed to update Bank Receipt payment');
//     }

//     console.log(uploadedReceipt);
//     return res.status(200).json(uploadedReceipt);

//     fs.unlink(file, (err) => {
//       if(err) throw err;
//       console.log("File succesfully deleted")
//     })

//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json(error.message);
//   }
// })

module.exports = router;