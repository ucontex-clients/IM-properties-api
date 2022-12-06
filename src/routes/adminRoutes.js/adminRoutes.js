const express = require('express');
const router = express.Router();
const Admin = require('../../controllers/adminController/createAdmin');

router.post('/create', Admin.registerController);
router.post('/login', Admin.login);
router.delete('/delete/:admin', Admin.delete);

module.exports = router;