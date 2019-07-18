//Custom authorization middleware (authMW) for account based 

const authMW = {

  authPurchaser: (req, res, next) => {
    if (req.user.accountType === 1) next();
    else res.sendStatus(401);
  },

  authPhotographer: (req, res, next) => {
    console.log("Request: " + req.user.accountType)
    if (req.user.accountType === 0) next();
    else res.sendStatus(401);
  }

}

module.exports = authMW;


