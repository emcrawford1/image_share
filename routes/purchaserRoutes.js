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
      model: Picture
    }]
  })
    .then(cart => {
      if (cart.length < 1) {
        res.json(cart);
      }

      else {
        console.log('Cart: ', req.user)
        let checkOutItems = cart.map(item => item.picture.price);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const priceObject = {
          totalPrice: checkOutItems.reduce(reducer),
          token: req.user.token
        }
        console.log('Checkout: ', priceObject);
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


//Checkout - Place Order = Purchaser.  A purchase confirmation is created, then the Cart is queried
//to obtain the data necessary for entry into the purchases table.  After the Cart has been queried
//a new entry is created in the Purchases table.
router.post('/placeorder', (req, res) => {
  const email = req.user.email;
  purchConf.create({
    userEmail: email,
  })
    .then(data => {
      const confId = data.id;
      Cart.findAll({
        attributes: ['pictureId', 'userEmail'],
        where: { userEmail: email },
        include: [{
          model: Picture,
          attributes: ['price', ['userEmail', 'photographerEmail']]
        }]
      })
        .then(responseData => {
          const dataHolder = JSON.parse(JSON.stringify(responseData));
          let cartData = dataHolder.map(item => {
            return {
              pictureId: item.pictureId,
              userEmail: email,
              priceAtPurchase: item.picture.price,
              purchaseConfirmationId: confId,
              photographerEmail: item.picture.photographerEmail
            }
          })
          Purchases.bulkCreate(cartData)
            .then(purchData => {
              res.json(purchData)
            })
        })
        .catch(err => console.log(err))
    })
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
      attributes: [['priceAtPurchase', 'totalPrice']]
      // where: { purchaseConfirmationId: Sequelize.col('purchase_confirmation.id') }
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
      const purchaseListing = {
        purchases,
        token: req.user.token
      }
      res.send(purchaseListing);
    })
    .catch(err => console.log("Error: " + err))
})

//PurchaserLandingPage.js = Purchaser
router.get('/categories', (req, res) =>

  Category.findAll({
    attributes: ['id', ['name', 'category'], ['pic', 'filePath']]
  })
    .then(categories => {
      console.log('Category Request: ', req)
      const catData = {
        token: req.user.token,
        categories
      }
      res.send(catData);
    })
    .catch(err => console.log(err))
);

//PCategoryView.js = Authenticated
router.get('/specificcategoryview/:id', (req, res) => {
  const categorySearch = req.params.id;
  Picture.findAll({
    attributes: ['id', 'title', 'unrestrictedFilePath', 'disabled'],
    where: {
      categoryId: categorySearch,
      disabled: '0',
      picType: '1'
    }
  })
    .then(data => {
      categoryData = {
        token: req.user.token,
        data
      }
      res.send(categoryData)
    })
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
    attributes: ['id', 'title', ['createdAt', 'dateAdded'], 'description', 'price', 'unrestrictedFilePath', 'userEmail'],
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
        unrestrictedFilePath: data1[0].unrestrictedFilePath,
        userName: data1[0].userEmail,
        firstName: data1[0].user.user_info.firstName,
        lastName: data1[0].user.user_info.lastName
      }
      const picData = {
        token: req.user.token,
        picture: responseData
      }
      res.send(picData);
    })
    .catch(err => console.log(err))
})


//Add to Cart = Purchaser
router.post('/addtocart/', (req, res) => {
  const email = req.user.email;
  const picId = req.body.picId;
  Picture.findAll({
    where: { id: picId }
  })
    .then(picData => {
      Cart.create({
        userEmail: email,
        pictureId: picId,
        photographerEmail: picData[0].userEmail

      })
        .then(data => {
          const cartData = {
            token: req.user.token,
            data: picData[0].userEmail
          }
          res.json(cartData)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
});

//PYourPhotos.js - get photos by Confirmation Number = Purchaser
router.get('/pyourphotosconf/:confId', (req, res) => {
  const confId = req.params.confId;
  const userName = req.user.email;
  Purchases.findAll({
    attributes: ['pictureId'],
    where: { 
      purchaseConfirmationId: confId,
      userEmail: userName

      },
    include: [{
      model: Picture,
      attributes: ['title', 'restrictedFilePath']
    }]
  })
    .then(data => {
      const dataConversion = JSON.parse(JSON.stringify(data));
      let dataResponse = dataConversion.map(item => {
        return {
          id: item.pictureId,
          title: item.picture.title,
          restrictedFilePath: item.picture.restrictedFilePath
        }

      })

      const confData = {
        token: req.user.token,
        confirmationData: dataResponse
      }
      
      res.send(confData)
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
      attributes: ['title', 'restrictedFilePath']
    }
  })
    .then(data => {
      const dataConversion = JSON.parse(JSON.stringify(data));
      let dataResponse = dataConversion.map(item => {
        return {
          id: item.pictureId,
          title: item.picture.title,
          restrictedFilePath: item.picture.restrictedFilePath
        }

      })
      const photosByEmail = {
        token: req.user.token,
        photoData: dataResponse
      }
      res.send(photosByEmail)
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
      attributes: ['id', 'title', 'price', 'unrestrictedFilePath', 'userEmail']
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
          unrestrictedFilePath: item.picture.unrestrictedFilePath,
          userName: item.picture.userEmail
        }
      })
      
      const purchaseCart = {
        token: req.user.token,
        purchData: responseData
      }
      res.send(purchaseCart)
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
      const postPurchData = {
        token: req.user.token,
        purchase: responseData
      }
      res.send(postPurchData)
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
      attributes: ['description', 'title', 'restrictedFilePath']
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
          restrictedFilePath: item.picture.restrictedFilePath 
        }
      })
      const purchasedPhotoData = {
        token: req.user.token,
        purchData: responseData
      }
      res.send(purchasedPhotoData)
    })
    .catch(err => console.log(err))
})

//PViewPhotographerPhotos.js = Purchaser
router.get('/pviewphotographerphotos/:photographerId', (req, res) => {
  const photographerId = req.params.photographerId;

  Picture.findAll({
    attributes: ['id', 'title', 'unrestrictedFilePath'],
    where: {
      userEmail: photographerId,
      disabled: '0',
      picType: '1'
    }
  })
    .then(data => {
      const photoData = {
        token: req.user.token,
        photographerData: data
      }
      res.json(photoData)
    })
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
      const photographerProfile = {
        token: req.user.token,
        photoProfileData: responseData
      }
      res.json(photographerProfile)
    })
    .catch(err => console.log(err))
})

module.exports = router;