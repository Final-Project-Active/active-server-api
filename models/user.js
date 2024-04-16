const db = require('../config/db');

class User {
  static collection() {
    return db.collection('users');
  }
}

module.exports = User;