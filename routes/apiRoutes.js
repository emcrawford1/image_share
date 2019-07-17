const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const passport = require('passport');
const db = require('../config/connection');
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
router.get('/checkout/:userId', (req, res) => {
  const userId = req.params.userId;
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
router.get('/getpurchaseitems/:userId', (req, res) => {
  const userId = req.params.userId;

  Cart.findAll({
    attributes: ['pictureId', 'userEmail'],
    where: { userEmail: userId },
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
router.post('/placeorder/:userId', (req, res) => {
  const userId = req.params.userId;
  purchConf.create({
    userEmail: userId,
  })
    .then(status => res.json(status))
    .catch(err => console.log(err))
})

//Get last purchase confirmation = Purchaser
router.get('/getlastorder/:userId', (req, res) => {
  const userId = req.params.userId;
  purchConf.findAll({
    limit: 1,
    where: { userEmail: userId },
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
}
);


//PSpecificPictureView.js - onLoad() - querying cart - Purchaser
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

//PSpecificPictureView.js - onLoad() - querying purchases - Purchaser
router.get('/PSpecificPictureView/purchases/:userId/:picId', (req, res) => {
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
router.post('/addtocart/:userId/:picId', (req, res) => {
  const userId = req.params.userId;
  const picId = req.params.picId;

  Cart.create({
    userEmail: userId,
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
router.get('/pyourphotosemail/:email', (req, res) => {
  const emailId = req.params.email;
  Purchases.findAll({
    attributes: ['pictureId'],
    where: { userEmail: emailId },
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
router.get("/purchasecart/:id", (req, res) => {
  const userId = req.params.id;
  Cart.findAll({
    attributes: [['id', 'cartId'], ['userEmail', 'purchaserId']],
    where: { userEmail: userId },
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
router.delete('/clearcart/:userId', (req, res) => {
  const userId = req.params.userId;
  Cart.destroy({
    where: { userEmail: userId }
  })
    .then(deletedCart => res.json(deletedCart))
    .catch(err => console.log(err))
})


//PostPurchase.js = Purchaser
router.get('/postpurchase/:userId', (req, res) => {
  const userId = req.params.userId;
  purchConf.findAll({
    limit: 1,
    where: { userEmail: userId },
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
router.get('/purchasedphotoview/:userId/:picId', (req, res) => {
  const picId = req.params.picId;
  const userId = req.params.userId;

  Purchases.findAll({
    limit: 1,
    attributes: ['id', 'pictureId', ['photographerEmail', 'userName'], ['createdAt', 'dateAdded'], ['priceAtPurchase', 'purchasePrice']],
    where: {
      userEmail: userId,
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

//PhotographerLanding.js = Photographer
router.get('/photographerlanding/:userId', (req, res) => {
  const userId = req.params.userId;

  User.findAll({
    where: {
      email: userId
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
router.get('/photographermypictures/:userId', (req, res) => {
  const userId = req.params.userId;
  Picture.findAll({
    where: { userEmail: userId },
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
router.get('/photographersales/:userId', (req, res) => {
  const userId = req.params.userId;

  Purchases.findAll({
    attributes: ['userEmail', 'priceAtPurchase', 'pictureId', 'createdAt'],
    where: { photographerEmail: userId },
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

//PViewPhotographerPhotos.js = Purchaser
router.get('/pviewphotographerphotos/:userId', (req, res) => {
  const userId = req.params.userId;

  Picture.findAll({
    attributes: ['id', 'title', 'filePath'],
    where: {
      userEmail: userId,
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


//Register - populate user table = Unprotected
router.post('/register', (req, res) => {
  const { email, password, firstName,
    lastName, accountType, aboutMe } = req.body;

  User.create({
    email: email,
    password: password,
    accountType: accountType
  })
    .then(data => {
      UserInfo.create({
        firstName: firstName,
        lastName: lastName,
        aboutMe: aboutMe,
        userEmail: email
      })
      .then(data => {
        console.log("hi");
        res.sendStatus(200)
      })
      .catch( err => console.log(err))
    })
    .catch(err => console.log(err))
})


//Login Handle = Unprotected
router.post('/login', (req, res, next) => {
  console.log(req.body)
  User.findOne({
    where: { email: req.body.email }
  }
    )
  .then( user => {
    if( user === null || user.length < 1 ) {
      return res.status(404).json({
        message: 'Authorization failed'
      });
    }
    console.log(user.password)
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if(err) {
        console.log(err)
          return res.status(401).json({
            message: "Authorization failed"
          });

      }
      if(!result) {
        return res.status(401).json({
          message: "Authorization failed"
        })
      }
      if(result) {
        return res.status(200).json({
          message: "Authorization successful"
        })
      }
    })
  })
})


//Need to figure this out
router.get('/logout', (req, res) => {
  req.logout();
})

module.exports = router;
