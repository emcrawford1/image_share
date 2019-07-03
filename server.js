const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Database
const db = require('./models');


//Test DB
// db.authenticate()
//   .then(() => console.log('Database connected....'))
//   .catch(err => console.log('Error: ' + err));

const app = express();

app.get('/', (req, res) => res.send('Howdy World'))

//API routes
app.use('/api', require('./routes/apiRoutes'));

const PORT = process.env.PORT || 3001;

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
