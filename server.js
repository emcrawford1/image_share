const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const passport = require('passport');
const strategy = require('./config/passport');

//PORT
const PORT = process.env.PORT || 3001;

//Database
const db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Passport middleware
passport.use(strategy)
app.use(passport.initialize());


//API routes
app.use('/api', require('./routes/apiRoutes'));


//Sequelize sync & app.listen
db.sequelize.sync( {force: false}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
