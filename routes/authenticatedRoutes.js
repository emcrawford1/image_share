const express = require('express');
const router = express.Router();


router.get('/getUser', (req, res) => {
  const userObject = {
    email: req.user.email,
    accountType: req.user.accountType
  }
  res.jsonp(userObject)
})

module.exports = router;