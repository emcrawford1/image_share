const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const models = require('./models');
const User = models.user;

//Passport config
// require('./config/passport')(passport)
const PORT = process.env.PORT || 3001;

//Database
const db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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

//Passport middleware
passport.use(strategy)
app.use(passport.initialize());





app.get('/', (req, res) => res.send('Howdy World'));

app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.user)
  res.send('I\'m protected ' + req.user.password);
})

app.post('/getToken', (req, res ) => {
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
      res.send(token).json({accountType: user.accountType})
      }
    })
  })
    .catch(err => {
      return res.status(401).send({ err: err})
    })
  })


//API routes
app.use('/api', require('./routes/apiRoutes'));
// app.get('/logout')


// app.listen(PORT, console.log(`Server started on port ${PORT}`));

db.sequelize.sync( {force: true}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
