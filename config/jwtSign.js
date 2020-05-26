const jwt = require('jsonwebtoken');

const jwtSign = (email) => { 
  const payload = {
    email,
    date: Date.now()
  }
  return jwt.sign(payload, process.env.SECRET_OR_KEY);
}

module.exports = jwtSign;