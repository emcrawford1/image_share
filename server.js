const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const path = require('path');
const passport = require('passport');
const strategy = require('./config/passport');


//PORT
const PORT = process.env.PORT || 3001;

//Database
const db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  app.get('*', (req, res) => {
    console.log('Request: ', req)
    console.log('Request body: ', req.body)
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

//Passport middleware
passport.use(strategy)
app.use(passport.initialize());


//API routes
app.use('/api', require('./routes/apiRoutes'));


//Static image routes
app.use('/images',  passport.authenticate('jwt', {session: false}), require('./routes/imageRoutes'));


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
