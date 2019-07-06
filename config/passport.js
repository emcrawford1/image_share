const LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const models = require('../models');
const User = models.user;



module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        where: { email: email }
      })
        .then(user => {
          if (!user) {
            return done(null, false, { Message: "That email is not registered." })
          }
          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            }
            else {
              return done(null, false, { message: "Password incorrect" })
            }
          });
        })
        .catch(err => console.log(err))
    })
  )



  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

}