const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

//Database
const db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Test DB
// db.authenticate()
//   .then(() => console.log('Database connected....'))
//   .catch(err => console.log('Error: ' + err));



app.get('/', (req, res) => res.send('Howdy World'))

//API routes
app.use('/api', require('./routes/apiRoutes'));


// app.listen(PORT, console.log(`Server started on port ${PORT}`));

db.sequelize.sync( {force: false}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
