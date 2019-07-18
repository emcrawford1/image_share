const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../models');
const Category = models.category;
const User = models.user;
const Picture = models.picture;
const Cart = models.cart;
const UserInfo = models.user_info;
const purchConf = models.purchase_confirmation;
const Purchases = models.purchases;


// Checkout.js - Purchaser
router.get('/checkout', (req, res) => {
  const email = req.user.email;
  Cart.findAll({
    where: {
      userEmail: email,
    },
    include: [{
      model: Picture,
      where: { id: Sequelize.col('cart.pictureId') }
    }]
  })
    .then(cart => {
      if (cart.length < 1) {
        res.json(cart);
      }

      else {
        let checkOutItems = cart.map(item => item.picture.price);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const priceObject = {
          totalPrice: checkOutItems.reduce(reducer)
        }
        console.log(priceObject);
        res.json(priceObject);
      }
    })
    .catch(err => console.log(err))
});


//Checkout - Query cart for items that will be posted to purchases - Purchaser
router.get('/getpurchaseitems', (req, res) => {
  const email = req.user.email;

  Cart.findAll({
    attributes: ['pictureId', 'userEmail'],
    where: { userEmail: email },
    include: [{
      model: Picture,
      attributes: ['price', ['userEmail', 'photographerEmail']]
    }]

  })
    .then(data => {
      const data1 = JSON.parse(JSON.stringify(data));
      let responseData = data1.map(item => {
        return {
          pictureId: item.pictureId,
          userEmail: item.userEmail,
          priceAtPurchase: item.picture.price,
          photographerEmail: item.picture.photographerEmail
        }
      });
      res.json(responseData);
    })
    .catch(err => console.log(err))
})


//Checkout - Place Order = Purchaser
router.post('/placeorder', (req, res) => {
  const email = req.user.email;
  purchConf.create({
    userEmail: email,
  })
    .then(status => res.json(status))
    .catch(err => console.log(err))
})

//Get last purchase confirmation = Purchaser
router.get('/getlastorder', (req, res) => {
  const email = req.user.email;
  purchConf.findAll({
    limit: 1,
    where: { userEmail: email },
    order: [['createdAt', 'DESC']]
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
})


//Post to purchases = Purchaser
router.post('/purchasepost', (req, res) => {
  const purchasePost = req.body;
  console.log(req.body);
  Purchases.bulkCreate(purchasePost)
    .then(data => {
      console.log(data);
      res.json(data)
    })
    .catch(err => console.log(err))
})

//MyPurchases.js = Purchaser
router.get('/mypurchases', (req, res) => {
  const email = req.user.email;
  purchConf.findAll({
    attributes: [['id', 'confirmationNumber'], ['createdAt', 'date']],
    where: {
      userEmail: email
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

//PurchaserLandingPage.js = Purchaser
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

//PCategoryView.js = Authenticated
router.get('/specificcategoryview/:id', (req, res) => {
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
});


//PSpecificPictureView.js - onLoad() - querying cart - Purchaser
router.get('/PSpecificPictureView/cart/:picId', (req, res) => {
  const email = req.user.email;
  const picId = req.params.picId;

  Cart.findAll({
    attributes: ['id'],
    where: {
      userEmail: email,
      pictureId: picId
    }
  })
    .then(cartData => {
      console.log(cartData.length);
      res.send(cartData);
    })
    .catch(err => console.log(err));
});

//PSpecificPictureView.js - onLoad() - querying purchases - Purchaser
router.get('/PSpecificPictureView/purchases/:picId', (req, res) => {
  const email = req.user.email;
  const picId = req.params.picId;

  Purchases.findAll({
    attributes: ['id'],
    where: {
      userEmail: email,
      pictureId: picId
    }
  })
    .then(purchData => {
      console.log(purchData.length);
      res.send(purchData);
    })
    .catch(err => console.log(err));
});


//PSpecificPictureView.js - onLoad() - querying picture - Purchaser
router.get('/PSpecificPictureView/:picId', (req, res) => {
  const pictId = req.params.picId;

  Picture.findAll({
    attributes: ['id', 'title', ['createdAt', 'dateAdded'], 'description', 'price', 'filePath', 'userEmail'],
    where: {
      id: pictId
    },
    include: {
      model: User,
      attributes: ['email'],
      include: {
        model: UserInfo,
        attributes: ['firstName', 'lastName']
      }
    }

  })
    .then(data => {
      const data1 = JSON.parse(JSON.stringify(data));

      const responseData = {
        id: data1[0].id,
        title: data1[0].title,
        dateAdded: data1[0].dateAdded,
        description: data1[0].description,
        price: data1[0].price,
        filePath: data1[0].filePath,
        userName: data1[0].userEmail,
        firstName: data1[0].user.user_info.firstName,
        lastName: data1[0].user.user_info.lastName
      }
      console.log(responseData);
      res.send(responseData);
    })
    .catch(err => console.log(err))
})


//Add to Cart = Purchaser
router.post('/addtocart/:picId', (req, res) => {
  const email = req.user.email;
  const picId = req.params.picId;

  Cart.create({
    userEmail: email,
    pictureId: picId
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
});

//PYourPhotos.js - get photos by Confirmation Number = Purchaser
router.get('/pyourphotosconf/:confId', (req, res) => {
  const confId = req.params.confId;
  Purchases.findAll({
    attributes: ['pictureId'],
    where: { purchaseConfirmationId: confId },
    include: [{
      model: Picture,
      attributes: ['title', 'filePath']
    }]
  })
    .then(data => {
      const dataConversion = JSON.parse(JSON.stringify(data));
      let dataResponse = dataConversion.map(item => {
        return {
          id: item.pictureId,
          title: item.picture.title,
          filePath: item.picture.filePath
        }

      })
      res.send(dataResponse)
    })
    .catch(err => console.log(err))
})

//PYourPhotos.js - get photos by userEmail = Purchaser
router.get('/pyourphotosemail', (req, res) => {
  const email = req.user.email;
  Purchases.findAll({
    attributes: ['pictureId'],
    where: { userEmail: email },
    include: {
      model: Picture,
      attributes: ['title', 'filePath']
    }
  })
    .then(data => {
      const dataConversion = JSON.parse(JSON.stringify(data));
      let dataResponse = dataConversion.map(item => {
        return {
          id: item.pictureId,
          title: item.picture.title,
          filePath: item.picture.filePath
        }

      })
      res.send(dataResponse)
    })
    .catch(err => console.log(err))
})

//PurchaseCart.js = Purchaser
router.get("/purchasecart", (req, res) => {
  const email = req.user.email;
  Cart.findAll({
    attributes: [['id', 'cartId'], ['userEmail', 'purchaserId']],
    where: { userEmail: email },
    include: {
      model: Picture,
      attributes: ['id', 'title', 'price', 'filePath', 'userEmail']
    }
  })
    .then(data => {
      const data1 = JSON.parse(JSON.stringify(data));
      let responseData = data1.map(item => {
        return {
          cartId: item.cartId,
          purchaserId: item.purchaserId,
          pictureId: item.picture.id,
          title: item.picture.title,
          price: item.picture.price,
          filePath: item.picture.filePath,
          userName: item.picture.userEmail
        }
      })
      console.log(responseData)
      res.send(responseData)
    })
    .catch(err => console.log(err))
})

//Delete item from cart = Purchaser
router.delete('/removeitem/:id', (req, res) => {
  const cartItem = req.params.id;
  Cart.destroy({
    where: { id: cartItem }
  })
    .then(deletedItem => res.json(deletedItem))
    .catch(err => console.log(err))
})

//Clear cart for user = Purchaser
router.delete('/clearcart', (req, res) => {
  const email = req.user.email;
  Cart.destroy({
    where: { userEmail: email }
  })
    .then(deletedCart => res.json(deletedCart))
    .catch(err => console.log(err))
})

//PostPurchase.js = Purchaser
router.get('/postpurchase', (req, res) => {
  const email = req.user.email;
  purchConf.findAll({
    limit: 1,
    where: { userEmail: email },
    order: [['createdAt', 'DESC']],
    include: [{
      model: User,
      attributes: ['email'],
      include: [{
        model: UserInfo,
        attributes: ['firstName']
      }]
    }]
  })
    .then(data => {
      const data1 = JSON.parse(JSON.stringify(data));
      const responseData = data1.map(item => {
        return {
          userId: item.userEmail,
          confirmationNumber: item.id,
          firstName: item.user.user_info.firstName
        }
      })
      res.send(responseData)
    }
    )
    .catch(err => console.log(err))
})

//PurchasedPhotoView.js = Purchaser
router.get('/purchasedphotoview/:picId', (req, res) => {
  const picId = req.params.picId;
  const email = req.user.email;

  Purchases.findAll({
    limit: 1,
    attributes: ['id', 'pictureId', ['photographerEmail', 'userName'], ['createdAt', 'dateAdded'], ['priceAtPurchase', 'purchasePrice']],
    where: {
      userEmail: email,
      pictureId: picId
    },
    include: [{
      model: Picture,
      attributes: ['description', 'title', 'filePath']
    }]
  })
    .then(data => {
      const data1 = JSON.parse(JSON.stringify(data));
      const responseData = data1.map(item => {
        return {
          pictureId: item.pictureId,
          title: item.picture.title,
          description: item.picture.description,
          userName: item.userName,
          dateAdded: item.dateAdded,
          purchasePrice: item.purchasePrice,
          filePath: item.picture.filePath
        }
      })
      res.send(responseData)
    })
    .catch(err => console.log(err))
})

//PViewPhotographerPhotos.js = Purchaser
router.get('/pviewphotographerphotos', (req, res) => {
  const email = req.user.email;

  Picture.findAll({
    attributes: ['id', 'title', 'filePath'],
    where: {
      userEmail: email,
      disabled: '0'
    }
  })
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

//PViewPhotographerProfile = Purchaser
router.get('/pviewphotographerprofile/:userId', (req, res) => {
  const userId = req.params.userId;

  User.findOne({
    attributes: ['email'],
    where: { email: userId },
    include: [{
      model: UserInfo,
      attributes: ['firstName', 'lastName', ['createdAt', 'dateAdded'], 'aboutMe', ['profilePic', 'filePath']]

    }]
  })
    .then(data => {
      const data1 = JSON.parse(JSON.stringify(data));
      const responseData = {
        userName: data1.email,
        firstName: data1.user_info.firstName,
        lastName: data1.user_info.lastName,
        dateAdded: data1.user_info.dateAdded,
        aboutMe: data1.user_info.aboutMe,
        filePath: data1.user_info.filePath
      };
      res.json(responseData)
    })
    .catch(err => console.log(err))
})

module.exports = router;