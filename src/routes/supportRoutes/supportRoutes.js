const express = require('express')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const { createSupport } = require('../../controllers/supportController/createSupport');
const router = express.Router();

router.post('/createsupport', verifyToken, createSupport);

module.exports = router;