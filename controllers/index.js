const Article = require('./articleController')
const User = require("./userController")
const Analytics = require("./analyticsController")
const Workout = require("./workoutController")
const UserWorkout = require("./userworkoutController")

const home = (req, res) => {
  res.status(200).json({ message: 'Welcome to Active Server API' })
}

module.exports = {
  home,
  getArticles: Article.getArticles,
  registerUser: User.registerUser,
  loginUser: User.loginUser,
  findById: User.findById,
  createAnalytics: Analytics.createAnalytics,
  getAnalytics: Analytics.getAnalytics,
  getWorkouts: Workout.getWorkouts,
  getWorkoutById: Workout.getWorkoutById,
  addUserWorkout: UserWorkout.addUserWorkout,
  updateUserWorkout: UserWorkout.updateUserWorkout
}
