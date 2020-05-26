//Custom authorization middleware (authMW) for account based 

//Setting token expiration - currently set to 2 hours
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const expirationTime = 2 * hour;


const authMW = {

  authPurchaser: (req, res, next) => {

    const tokenExpiration = req.user.payload.date + expirationTime;
    const currentTime = Date.now();

    if (req.user.accountType === 1 && currentTime < tokenExpiration) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  },

  authPhotographer: (req, res, next) => {
    if (req.user.accountType === 0) next();
    else res.sendStatus(401);
  }

}

module.exports = authMW;


