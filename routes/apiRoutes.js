const express = require('express');
const router = express.Router();
const authMW = require('../config/auth_middleware/auth_functions');
const passport = require('passport');
//Will need to add passport.js


//Imported Routes
const unprotectedRoutes = require("./unprotectedRoutes");
const authenticatedRoutes = require("./authenticatedRoutes");
const photographerRoutes = require("./photographerRoutes");
const purchaserRoutes = require("./purchaserRoutes");


//Routes

//Unprotected Route(s)
router.use("/", unprotectedRoutes);

//Protected Routes
router.use("/photographerRoutes", passport.authenticate('jwt', {session: false}), authMW.authPhotographer, photographerRoutes);
router.use("/purchaserRoutes", passport.authenticate('jwt', {session: false}), authMW.authPurchaser, purchaserRoutes);

module.exports = router;

