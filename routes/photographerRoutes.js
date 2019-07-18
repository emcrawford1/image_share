const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../models');
const User = models.user;
const Picture = models.picture;
const UserInfo = models.user_info;
const Purchases = models.purchases;

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
      res.send(responseData)
    })
    .catch(err => console.log(err))
})

//PhotographerMyPictures.js = Photographer
router.get('/photographermypictures/', (req, res) => {
  const email = req.user.email;
  Picture.findAll({
    where: { userEmail: email },
    attributes: ['id', 'title', 'filePath']
  })
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

//PhotographerPhotoView.js - onLoad() = Photographer
router.get('/photographerphotoview/:picId', (req, res) => {
  const picId = req.params.picId;
  Picture.findAll({
    where: { id: picId },
    attributes: ['id', 'title', 'filePath', 'price', ['userEmail', 'userName'],
      ['createdAt', 'dateAdded'], 'description', 'disabled']
  })
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

//PhotographerPhotoview.js - Disable photo = Photographer (add ability for only owner of photo to 
//disable)
router.put('/setdisable/:picId', (req, res) => {
  const picId = req.params.picId;
  Picture.update(
    { disabled: "true" },
    { where: { id: picId } }
  )
    .then(status => res.json(status))
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
      res.send(responseData)
    })
    .catch(err => console.log(err))
})

module.exports = router;