const router = require('express').Router()
const getAllUserController = require('../../controllers/userController/getAllUserController')
const {getSingleUserController, getAnySingleUser} = require('../../controllers/userController/getSingleUserController')
const {updateUserController} = require('../../controllers/userController/updateUserController')
const deleteUserController = require('../../controllers/userController/deleteUserController')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middleware/authMiddleware/verifyAdmin')
const verifyAdminAndUserToken = require('../../middleware/authMiddleware/verifyUserAndAdmin')
const { uploadPhotos } = require('../../config/multer');
const { cloudinary } = require('../../config/cloudinaryConfig');
const validateUserDetails = require('../../utils/vaildateUserDetails')
const addUserDetails = require('../../controllers/userController/addUserDetailsController')
const User = require('../../models/User')
const fs = require('fs');
const { userProperty } = require('../../controllers/userController/userProperties.js');

router.get('/all',verifyToken,verifyAdminToken, getAllUserController )

router.patch('/addprofile', verifyToken, addUserDetails );

router.get('/single',verifyToken,verifyAdminAndUserToken, getSingleUserController )

router.get('/anysingle/:id', getAnySingleUser )

router.get('/userproperty', verifyToken, userProperty);

router.put('/update',verifyToken,verifyAdminAndUserToken, updateUserController )

router.delete('/delete',verifyToken,verifyAdminAndUserToken, deleteUserController );


router.patch('/profile',verifyToken, uploadPhotos.array('images'), async (req, res ) => {
  const urls = [];
  const user = req.user;
  const body = req.body;
  const files = req.files;

  console.log('===================files');
  console.log(files)

  validateUserDetails(body, (e, values)=> {
    if(e) {
      return res.json({ error: { message: e.details[0].message } });
    }
  })

  if(!files) {
    return res.status(400).json({ message: "No files attached!" })
  }

  try {
    files.forEach(file => {
      cloudinary.uploader.upload(file.path, (err, result) => {
        if(err){
          console.log(err.message);
          return res.send(err.message)
        }
        console.log('====================result');
        console.log(result);

        urls.push(result.public_id);
      })
    })

    console.log('=====================urls');
    console.log(urls);

    body.pictureupload = urls[0];
    body.idupload = urls[1];

    // Extracting
    const {
      firstname,
      lastname,
      gender,
      country,
      state,
      city,
      lga,
      phone1,
      phone2,
      date_of_birth,
      occupation,
      address,
      pictureupload,
      idupload,
      referer
    } = body

    const updatedProfile = await User.findByIdAndUpdate(user._id, 
      {
        firstname,
        lastname,
        gender,
        country,
        state,
        city,
        lga,
        phone1,
        phone2,
        date_of_birth,
        occupation,
        address,
        pictureupload,
        idupload,
        referer
      },
      {
        new: true,
        runValidators: true,
      }
    )
    
    if(!updatedProfile) {
      console.log(error.message);
    return res.status(400).json({status:'failed', message: 'failed to update Profile'});
    }
    console.log(updatedProfile);
    return res.status(200).json({ status:'success', message: updatedProfile})

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error });
  }

})

module.exports = router
