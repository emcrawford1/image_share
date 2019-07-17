const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../models');
const Category = models.category;
const User = models.user;
const Picture = models.picture;
const Cart = models.cart;
const UserInfo = models.user_info;
const purchConf = models.purchase_confirmation;
const Purchases = models.purchases;



