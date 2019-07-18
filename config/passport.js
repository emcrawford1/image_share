//Passport Strategy - JWT

const dotenv = require('dotenv');
dotenv.config();
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.user;


//Options for passport JWT strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

//Passport JWT strategy
const strategy = new JwtStrategy(opts, (payload, next) => {
  User.findOne( { 
    where: { email: payload.email }
  })
  .then( res => {
    next(null, res)
  })
})

module.exports = strategy;