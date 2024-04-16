const Article = require('./articleController')

const home = (req, res) => {
  res.status(200).json({ message: 'Welcome to Active Server API' })
}

module.exports = {
  home,
  getArticles: Article.getArticles
}
