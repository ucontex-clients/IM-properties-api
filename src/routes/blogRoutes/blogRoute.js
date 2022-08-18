const express = require('express');
const blogDetailsController = require('../../controllers/blogController/blogDetailsController');
const createBlogController = require('../../controllers/blogController/createBlogController');
const deleteBlogController = require('../../controllers/blogController/deleteBlogController');
const getAllblogsController = require('../../controllers/blogController/getAllblogsController');
const editBlogController = require('../../controllers/blogController/editBlogController');
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
// const upload = require('../../services/multer')
const router = express.Router();


router.get('/',verifyToken,verifyAdminToken,verifyAdminAndUserToken, getAllblogsController);
router.post('/create-blog',verifyToken,verifyAdminToken, createBlogController);
router.get('/details/:id',verifyToken,verifyAdminToken,verifyAdminAndUserToken, blogDetailsController );
router.delete('/delete/:id',verifyToken,verifyAdminToken, deleteBlogController);
router.put('/update/:id',verifyToken,verifyAdminToken, editBlogController);

module.exports = router;