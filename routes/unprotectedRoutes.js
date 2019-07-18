const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
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

router.post('/login', (req, res ) => {
  if(!req.body.email || !req.body.password){
    return res.status(401).send("Fields not sent");
  }
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
      const payload = { email: user.email};
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
      res.json({
        token: token,
        accountType: user.accountType
      })
      }
    })
  })
    .catch(err => {
      return res.status(401).send({ err: err})
    })
  })

//Login Handle = Unprotected
// router.post('/login', (req, res, next) => {
//   console.log(req.body)
//   User.findOne({
//     where: { email: req.body.email }
//   }
//     )
//   .then( user => {
//     if( user === null || user.length < 1 ) {
//       return res.status(404).json({
//         message: 'Authorization failed'
//       });
//     }
//     console.log(user.password)
//     bcrypt.compare(req.body.password, user.password, (err, result) => {
//       if(err) {
//         console.log(err)
//           return res.status(401).json({
//             message: "Authorization failed"
//           });

//       }
//       if(!result) {
//         return res.status(401).json({
//           message: "Authorization failed"
//         })
//       }
//       if(result) {
//         return res.status(200).json({
//           message: "Authorization successful"
//         })
//       }
//     })
//   })
// })



module.exports = router;