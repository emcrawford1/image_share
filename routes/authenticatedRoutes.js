//Probably do not need this route.  Most likely I will just delete the JWT token from the user's 
//local storage on the front-end

//This route will get and return the user's email and account type

// const express = require('express');
// const router = express.Router();
// const models = require('../models');
// const Picture = models.picture;

const express = require('express');
const router = express.Router();


router.get('/getUser', (req, res) => {
  const userObject = {
    email: req.user.email,
    accountType: req.user.accountType
  }
  res.jsonp(userObject)
})
// //Need to figure this out
// router.get('/logout', (req, res) => {
//   req.logout();
// })


module.exports = router;