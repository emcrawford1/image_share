//Passport Strategy - JWT

const dotenv = require('dotenv');
dotenv.config();
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.user;
const jwtSign = require('../config/jwtSign')

//Function for cookie extraction
var extractCookie = function(req) {
  let token = null;

  if(req && req.cookies)
  {
    token = req.cookies["imageShare-jwt"];
  }

  return token;

}



//Options for passport JWT strategy
const opts = {
  jwtFromRequest: req => extractCookie(req),
  secretOrKey: process.env.SECRET_OR_KEY
};

//Passport JWT strategy
const strategy = new JwtStrategy(opts, (payload, next) => {
  User.findOne( { 
    where: { email: payload.email }
  })
  .then( res => {
    res.token = jwtSign(payload.email);
    res.payload = payload;
    next(null, res)
  })
})


module.exports = strategy;