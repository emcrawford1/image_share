const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../models');
const User = models.user;
const Picture = models.picture;
const UserInfo = models.user_info;
const Purchases = models.purchases;
const Categories = models.category;
const path = require('path');
const fs = require('fs')

//Adding multer which will attach file to the req object
const multer = require('multer');

//Adding jimp module which will add watermark to the images
const Jimp = require('jimp');


//fileFilter to determine if the file is a png or jpeg file.  If it is, the processing will 
//continue.  Otherwise, an error will be displayed.
const fileFilter = (req, file, cb) => {

   //Flag variable to determine if all of the fields have been sent in the request
   let fieldsFlag = true;

   //Logic to determine if the file exists, the proper fields were included in the request, and 
   //the file is a png or jpeg type.  If not, the fieldsFlag variable will be set to false
   if(!file) fieldsFlag = false;
   if(!req.body.imageName) fieldsFlag = false;
   if(!req.body.price) fieldsFlag = false;
   if(!req.body.category) fieldsFlag = false;
   if(!req.user.email) fieldsFlag = false;
   if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') fieldsFlag = false

   if(fieldsFlag) return cb(null, true)
   else return cb('Please ensure that all of the required fields were properly included in this request.')

}

//fileFilterProfile function to determine if file is a png or jpeg file.  If it is the processing will continue and 
//this photo will be used as the user's profile image.  Otherwise an error will be displayed.
const profileFileFilter = (req, file, cb) => {
console.log('Mime: ', file)
  let fileFlag = true;
  if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') fileFlag = false;

  if(fileFlag) return cb(null, true)
  else return cb('Please ensure that the file uploaded is of the proper type.')
}

/* Init Storage engine for images for sale (non-profile images) */
const storage = multer.diskStorage({
  destination: "./images/unmodified",
  // destination: "./public/images/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

/* Init Storage engine for profile images */
const profileStorage = multer.diskStorage({
  destination: "./images/profile",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

//Init Upload for profile images
const profileUpload = multer({
  storage: profileStorage,
  fileFilter: profileFileFilter
})


//PhotographerLanding.js = Photographer
router.get('/photographerlanding', (req, res) => {
  const email = req.user.email;

  User.findAll({
    where: {
      email: email
    },
    include: [{
      model: UserInfo
    }]
  })
    .then(data => {
      const data1 = JSON.parse(JSON.stringify(data));
      const responseData = data1.map(item => {
        return {
          userName: item.email,
          dateAdded: item.createdAt,
          firstName: item.user_info.firstName,
          lastName: item.user_info.lastName,
          aboutMe: item.user_info.aboutMe,
          filePath: item.user_info.profilePic

        }
      })
      const photographerData = {
        token: req.user.token,
        profile: responseData
      }
      res.send(photographerData)
    })
    .catch(err => console.log(err))
})

//PhotographerMyPictures.js = Photographer
router.get('/photographermypictures/', (req, res) => {
  const email = req.user.email;
  Picture.findAll({
    where: {
      userEmail: email,
      picType: '1'
    },
    attributes: ['id', 'title', 'restrictedFilePath']
  })
    .then(data => {
      const pictureData = {
        token: req.user.token,
        picData: data
      }
      res.json(pictureData)
    })
    .catch(err => console.log(err))
})

//PhotographerPhotoView.js - onLoad() = Photographer
router.get('/photographerphotoview/:picId', (req, res) => {
  const picId = req.params.picId;
  Picture.findAll({
    where: { id: picId },
    attributes: ['id', 'title', 'restrictedFilePath', 'price', ['userEmail', 'userName'],
      ['createdAt', 'dateAdded'], 'description', 'disabled']
  })
    // .then(data => res.json(data))
    .then(data => {
      const photographerData = {
        token: req.user.token,
        photoData: data
      }
      res.json(photographerData)
    })
    .catch(err => console.log(err))
})

//PhotographerPhotoview.js - Disable photo = Photographer (add ability for only owner of photo to 
//disable)
router.put('/setdisable/:picId', (req, res) => {
  const picId = req.params.picId;
  Picture.update(
    { disabled: "true" },
    {
      where: {
        id: picId,
        userEmail: req.user.email,
      }
    }
  )
    .then(status => {
      const disableData = {
        token: req.user.token,
        status
      }
      res.json(disableData)
    })
    .catch(err => console.log(err))
})

//PhotographerSales.js = Photographer
router.get('/photographersales/', (req, res) => {
  const email = req.user.email;

  Purchases.findAll({
    attributes: ['userEmail', 'priceAtPurchase', 'pictureId', 'createdAt'],
    where: { photographerEmail: email },
    include: [{
      model: Picture,
      attributes: ['title']
    }]
  })
    .then(data => {
      const data1 = JSON.parse(JSON.stringify(data));
      const responseData = data1.map(item => {
        return {

          picId: item.pictureId,
          price: item.priceAtPurchase,
          purchaser: item.userEmail,
          date: item.createdAt,
          title: item.picture.title

        }
      })
      const salesData = {
        token: req.user.token,
        sales: responseData
      }
      res.send(salesData)
    })
    .catch(err => console.log(err))
})


//PhotographerAddPhoto.js - Handle profile photo uploads
router.post('/profileUploads/', profileUpload.single('imageFile'), (req, res) => {
console.log('Req user: ', req.user.email)
  const currentDirectory = process.cwd();
  Picture.findAll({
    where: {
      userEmail: req.user.email,
      picType: '0'
    }
  })
  .then(pictureData => {
  
    //Delete all profile images from file system
    pictureData.forEach(element => fs.unlink(currentDirectory + '/' + element.restrictedFilePath, (err) => {
      if (err) console.log(err);
    }))
  
  //Delete database entries for the old profile image(s)
  Picture.destroy({
    where: {
      userEmail: req.user.email,
      picType: '0'
    }
  })

  //Create new entry in the Picture table with information regarding the user's new profile image.  Most of this is 
  //boilerplate since this information will not be seen by the user or purchasers
    .then(deleteData => {
      Picture.create({
        id: req.file.filename,
        title: req.user.email,
        description: 'Profile picture for ' + req.user.email,
        price: '0',
        restrictedFilePath: '/images/profile/' + req.file.filename,
        unrestrictedFilePath: '/images/profile/' + req.file.filename,
        picType: '0',
        categoryId: '1',
        userEmail: req.user.email
      })

      //Update the User_Info table with a reference to the user's new profile image
        .then(picData => {
          UserInfo.update(
            { profilePic: picData.dataValues.unrestrictedFilePath },
            { where: { userEmail: req.user.email } }
          )
          .then(updateData => {
            const token = req.user.token;
            res.send(token);
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})



//PhotographerAddPhoto.js - Handle photo uploads.  
router.post('/uploads/', upload.single('imageFile'), (req, res) => {

  Categories.findAll({
    where: { name: req.body.category },
    attributes: ['id']
  })
    .then(data => {
      console.log('File: ', req.file)
      Picture.create({
        id: req.file.filename,
        title: req.body.imageName,
        description: req.body.description,
        price: req.body.price,
        restrictedFilePath: '/images/unmodified/' + req.file.filename,
        unrestrictedFilePath: '/images/modified/' + req.file.filename,
        picType: req.body.picType,
        categoryId: data[0].id,
        userEmail: req.user.email
      })

        .then(responseData => {
    
          Jimp.read('images/unmodified/' + req.file.filename)
            .then(image => {
              Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
                .then(font => {
                  return image
                    .print(font, 10, 10, 'Image Share')
                    .write('images/modified/' + req.file.filename);
                });
            })
            .catch(err => console.log('Jimp error: ', err))
            const imageData = {
              token: req.user.token,
              data: responseData
            }
          res.send(imageData)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})

//PhotographerAddPhotos.js - Get categories to populate upload form
router.get('/getCategories/', (req, res) => {
  Categories.findAll({
    attributes: ['name'],
  })
    .then(categories => {
      const catData = {
        token: req.user.token,
        categories
      }
      res.send(catData)
    })
    .catch(err => console.log(err))
})

module.exports = router;