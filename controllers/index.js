const Article = require('./articleController')
const User = require("./userController")

const home = (req, res) => {
  res.status(200).json({ message: 'Welcome to Active Server API' })
}

module.exports = {
  home,
  getArticles: Article.getArticles,
  registerUser: User.registerUser,
  loginUser: User.loginUser
}
