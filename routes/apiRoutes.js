const express = require('express');
const router = express.Router();
const db = require('../config/connection');
const models = require('../models');
const Category = models.Category;
// const Category = require('../models/Category');

router.get('/', (req, res) => 
Category.findAll()
  .then(categories => {
    console.log(categories);
    res.send(categories);
  })
  .catch(err => console.log(err))
);

module.exports = router;