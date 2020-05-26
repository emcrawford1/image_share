const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
const Category = models.category;
const User = models.user;
const Picture = models.picture;
const Cart = models.cart;
const UserInfo = models.user_info;
const purchConf = models.purchase_confirmation;
const Purchases = models.purchases;


//Register - populate user table - Unprotected
router.post('/register', (req, res) => {

  //Variable to check if the input is valid.  If any of the validation functions return a value of false,
  //this variable will be changed to false and the server will respond with a 401.  
  let inputValid = true;

  //Calling the inputValidation function on all of the fields in req.body to ensure they exists.  If they 
  //do not exist then the inputValid variable will be set to false.
  if (!requestValidation(req.body, 'email')) inputValid = false;
  if (!requestValidation(req.body, 'password')) inputValid = false;
  if (!requestValidation(req.body, 'firstName')) inputValid = false;
  if (!requestValidation(req.body, 'lastName')) inputValid = false;
  if (!requestValidation(req.body, 'accountType')) inputValid = false;
  if (!requestValidation(req.body, 'aboutMe')) inputValid = false;

  if (!inputValid) res.status(400).send("Required fields not sent.");

  else {
    const { email, password, firstName,
      lastName, accountType, aboutMe } = req.body;


    //Calling the inputValidation function on the email, firstName, and lastName fields to determine if 
    //these fields are empty.  If so, the inputValid variable will be set to false. 
    if (!inputValidation(email)) inputValid = false;
    if (!inputValidation(firstName)) inputValid = false;
    if (!inputValidation(lastName)) inputValid = false;

    
    //Calling the passwordValidation function to determine if the password meets the complexity requirements
    if (!passwordValidation(password)) inputValid = false;
    
    //If statement to determine if the accountType variable is set to a 0 (photographer) or 1 (purchaser).
    if (accountType !== '0' && accountType !== '1') inputValid = false;
   
     
    //If the inputValid variable has been set to "False", the server will respond with a denied request.
    if (!inputValid) {
      res.status(401).send('Your access has been.....denied.')
    }

    //If the inputValid variable is true, a new user will be created and added to the database.
    else {

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
              res.sendStatus(200)
            })
            .catch(err => console.log(err))
        })
        .catch(err => {
          const errType = err.errors[0].type
          res.status(400).json(errType);
        })
    }
  }
})

//Login route
router.post('/login', (req, res) => {
  console.log(req.body)
  if (!req.body.email || !req.body.password) {
    return res.status(401).send("Fields not sent");
  }
  User.findOne({
    where: { email: req.body.email }
  }
  )
    .then(user => {
      if (user === null || user.length < 1) {
        return res.status(404).json({
          message: 'Authorization failed'
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          console.log(err)
          return res.status(401).json({
            message: "Authorization failed"
          });

        }
        if (!result) {
          return res.status(401).json({
            message: "Authorization failed"
          })
        }
        if (result) {
          const payload = {
            email: user.email,
            date: Date.now()
          };
          const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
          res.json({
            token: token,
            accountType: user.accountType
          })
        }
      })
    })
    .catch(err => {
      return res.status(401).send({ err: err })
    })
})

//Function for validating data.  This function checks to see if the input equals an empty string. If it 
//does not equal the empty string, it returns true, if it does equal an empty string, it returns false.
const inputValidation = input => input !== "" ? true : false;


//Function to check if the request object contains all the appropriate fields
const requestValidation = (reqBody, input) => reqBody[input] == undefined ? false : true;



//Password verification function to test if the password registered by the user meets the complexity 
//requirements.  The complexity requirements are the following:
//    --Password must be at least 8 characters long
//    --Password must have at least 3 of the 4 following characters:
//          *At least one upper case character 
//          *At least one lower case character 
//          *At least one digit (0-9) 
//          *At least one special char (
const passwordValidation = password => {
  let passwordBool = true;
  let charCounter = 0;

  let uChar = false;
  let lChar = false;
  let dChar = false;
  let sChar = false;

  //Password length check
  if (password.length < 8) passwordBool = false;


  //For loop that checks each character in the password for the complexity requirements
  for (let i = 0; i < password.length; i++) {
    if (password.charCodeAt(i) > 64 && password.charCodeAt(i) < 91) uChar = true;
    if (password.charCodeAt(i) > 96 && password.charCodeAt(i) < 123) lChar = true;
    if (password.charCodeAt(i) > 47 && password.charCodeAt(i) < 58) dChar = true;
    if (password.charCodeAt(i) > 32 && password.charCodeAt(i) < 48) sChar = true;
  }

  //Increment charCounter variable to determine if the complexity requirements have been met.
  if (uChar) charCounter++;
  if (lChar) charCounter++;
  if (dChar) charCounter++;
  if (sChar) charCounter++;


  //If statement to determine if 3 out of the 4 character types have been included in the user's 
  //password.
  if (charCounter < 3) passwordBool = false;

  return passwordBool;

}


module.exports = router;