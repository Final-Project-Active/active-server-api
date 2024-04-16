const jsonwebtoken = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = {
  sign: (payload) => jsonwebtoken.sign(payload, secret),
  verify: (token) => jsonwebtoken.verify(token, secret)
}