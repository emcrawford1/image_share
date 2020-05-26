const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.user;
const Picture = models.picture;
const UserInfo = models.user_info;
const Purchases = models.purchases;
const Categories = models.category;
const filePath = process.cwd();

//Image Routes

//There are no restrictions over photographers' profile pictures.  These pictures are not for sale and are freely accessible.
router.get('/profile/:id', (req, res) => {
  const id = req.params.id;
  res.sendFile(filePath + '/images/profile/' + id)
})


//There are no restrictions over images for sale that have been "modified" (images with the Image Share watermark).  These 
//images are freely available as a preview of the unmodified images.
router.get('/modified/:id', (req, res) => {
  const id = req.params.id;
  res.sendFile(filePath + '/images/modified/' + id)
})

router.get('/categories/:id', (req, res) => {
  const id = req.params.id;
  res.sendFile(filePath + '/images/categories/' + id)
})

//There are restrictions over the "unmodified" images.  These are the images that were originally uploaded by the 
//photographers and are restricted to purchasers who have purchased these pictures and the specific photographer who
//uploaded the image(s)
router.get('/unmodified/:id', (req, res) => {
  const id = req.params.id;
  const email = req.user.email;
  const accountType = req.user.accountType;


  //Handle if the user is a purchaser (accountType 1)
  if (accountType === 1) {

    Purchases.findAll({
      where: {
        userEmail: email,
        pictureId: id
      },
      attributes: ['id', 'pictureId', 'userEmail']
    })
      .then(purchData => {

        if (purchData.length < 1) {
          res.sendStatus(401)
        }

        else 
        {
          res.sendFile(filePath + '/images/unmodified/' + id)
        }
      })
      .catch(err => console.log(err))
  }

  //Handle if the user is a photographer (accountType 0)
  if(accountType === 0){

    Picture.findAll({
      where: {
        id: id
      },
      attributes: ['id', 'title', 'userEmail']
    })
    .then(pictureData => {
      const userEmail = pictureData[0].dataValues.userEmail;

      if(userEmail !== email)
      {
        res.sendStatus(401)
      }
     
      else
      {
        res.sendFile(filePath + '/images/unmodified/' + id)
      }
    })
    .catch(err => console.log(err))
  
  }

})

module.exports = router;