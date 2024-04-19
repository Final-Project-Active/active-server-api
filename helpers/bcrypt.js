const { hashSync, compareSync, genSaltSync } = require('bcrypt');

module.exports = {
  hash: (password) => hashSync(password, genSaltSync(10), null),
  compare: (password, hash) => compareSync(password, hash)
}
