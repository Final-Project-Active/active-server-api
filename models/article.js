const db = require('../config/db');

class Article {
  static collection() {
    return db.collection('articles');
  }

  static async findAll() {
    return await Article.collection().find({}).toArray();
  }
}

module.exports = Article;