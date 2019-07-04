const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const db = require('../config/connection');
const models = require('../models');
const Category = models.category;
const User = models.user;
const Picture = models.picture;
const Cart = models.cart;
const UserInfo = models.user_info;
const purchConf = models.purchase_confirmation;
const Purchases = models.purchases;


// Checkout.js
router.get('/checkout/:id', (req, res) => {
  const userId = req.params.id;
  Cart.findAll({
    where: {
      userEmail: userId,
    },
    include: [{
      model: Picture,
      where: { id: Sequelize.col('cart.pictureId') }
    }]
  })
    .then(cart => {
      if (cart.length < 2) {
        res.send(cart);
      }

      else {
        let checkOutItems = cart.map(item => item.picture.price);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const priceObject = {
          totalPrice: checkOutItems.reduce(reducer)
        }
        console.log(priceObject);
        res.send(priceObject);
      }
    })
    .catch(err => console.log(err))
});

//MyPurchases.js
router.get('/mypurchases/:id', (req, res) => {
  const userId = req.params.id;
  purchConf.findAll({
    attributes: [['id', 'confirmationNumber'], ['createdAt', 'date']],
    where: {
      userEmail: userId
    },
    include: [{
      model: Purchases,
      attributes: [['priceAtPurchase', 'totalPrice']],
      where: { purchaseConfirmationId: Sequelize.col('purchase_confirmation.id') }
    }]
  })
    .then(data => {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let data1 = JSON.stringify(data);
      let data2 = JSON.parse(data1);
      let purchases = data2.map((item, index) => ({
        confirmationNumber: item.confirmationNumber,
        date: item.date,
        totalPrice: item.purchases.map(item => item.totalPrice).reduce(reducer)
      }));
      console.log(data);
      res.send(purchases);
    })
    .catch(err => console.log("Error: " + err))
})



//PurchaserLandingPage.js
router.get('/categories', (req, res) =>
  Category.findAll({
    attributes: ['id', ['name', 'category'], ['pic', 'filePath']]
  })
    .then(categories => {
      console.log(categories);
      res.send(categories);
    })
    .catch(err => console.log(err))
);

//PCategoryView.js
router.get('/specificcategoryview/:id', (req, res) => 
{
  const categorySearch = req.params.id;
  console.log(categorySearch);
  Picture.findAll({
    attributes: ['id', 'title', 'filePath', 'disabled'],
    where: {
      categoryId: categorySearch,
      disabled: '0'
    }
  })
  .then(data => 
    res.send(data))
  .catch(err => console.log(err))
}
);


//PSpecificPictureView.js - onLoad() - querying cart
router.get('/PSpecificPictureView/cart/:userId/:picId', (req, res) => {
  const userId = req.params.userId;
  const picId = req.params.picId;

  Cart.findAll({
    attributes: ['id'],
    where: {
      userEmail: userId,
      pictureId: picId
    }
  })
  .then(cartData => {
    console.log(cartData.length);
    res.send(cartData);
  })
  .catch(err => console.log(err));
});

//PSpecificPictureView.js - onLoad() - querying purchases
router.get('/PSpecificPictureView/cart/:userId/:picId', (req, res) => {
  const userId = req.params.userId;
  const picId = req.params.picId;

  Purchases.findAll({
    attributes: ['id'],
    where: {
      userEmail: userId,
      pictureId: picId
    }
  })
  .then(purchData => {
    console.log(purchData.length);
    res.send(purchData);
  })
  .catch(err => console.log(err));
});

//PSpecificPictureView.js - onLoad() - querying picture
//Finish 7/4/2019
router.get('/PSpecificPictureView/:picId', (req, res) => {
  const picId = req.params.picId;

  Picture.findAll({
    attributes: ['id', 'title', ['createdAt', 'dateAdded'], 'description', 'price', 'filePath'],
    where: {
      id = picId
    },
    include: {
      model: UserInfo,
      attributes: ['firstName', 'lastName'],
      where: {}
    }
  })
})



router.get('/', (req, res) =>
  User.findAll()
    .then(users => {
      console.log(users);
      res.send(users);
    })
    .catch(err => console.log(err)));

router.get('/pictures', (req, res) =>
  Picture.findAll()
    .then(pictures => {
      console.log(pictures);
      res.send(pictures);
    })
    .catch(err => console.log(err)));


router.get('/', (req, res) =>
  Cart.findAll()
    .then(carts => {
      console.log(carts);
      res.send(carts);
    })
    .catch(err => console.log(err)));

router.get('/', (req, res) =>
  UserInfo.findAll()
    .then(info => {
      console.log(info);
      res.send(info);
    })
    .catch(err => console.log(err)));

router.get('/', (req, res) =>
  purchConf.findAll()
    .then(purch => {
      console.log(purch);
      res.send(purch);
    })
    .catch(err => console.log(err)));

router.get('/', (req, res) =>
  Purchases.findAll()
    .then(purch => {
      console.log(purch);
      res.send(purch);
    })
    .catch(err => console.log(err)));

module.exports = router;