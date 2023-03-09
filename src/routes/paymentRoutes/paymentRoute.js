const express = require('express');
const router = express.Router();
// const { uploadPhotos } = require('../../config/multer');
const { cloudinary } = require('../../config/cloudinaryConfig');
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const fs = require('fs');
const BankTransfer = require('../../models/BankTransferSchema');
const moment = require('moment');
const getAllUserPayment = require('../../controllers/paymentController/getAllUserPayment');
const PaymentController  = require("../../controllers/transactionController/addPaymentTransaction");


// router.post('/payment/:property/:transaction_url', verifyToken, PaymentController.outrightPayment);
// router.post('/payment/:property/:transaction_url', verifyToken, PaymentController.installmentalpayment);
router.get('/confirm', PaymentController.confirmPayment);
router.post('/addPayTransaction', verifyToken, PaymentController.addPayTransaction);
router.get("/payments", verifyToken, getAllUserPayment);
// router.patch('/update', PaymentController.update)

module.exports = router;