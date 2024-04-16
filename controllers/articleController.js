const Article = require('../models/article')

const getArticles = async (req, res) => {
  const articles = await Article.findAll()
  res.status(200).json(articles)
}

module.exports = {
  getArticles
}