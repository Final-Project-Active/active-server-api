const Article = require('./articleController')
const User = require("./userController")
const Analytics = require("./analyticsController")
const Workout = require("./workoutController")
const UserWorkout = require("./userworkoutController")
const Post = require("./postController")

module.exports = {
  getArticles: Article.getArticles,
  registerUser: User.registerUser,
  loginUser: User.loginUser,
  findById: User.findById,
  createAnalytics: Analytics.createAnalytics,
  getAnalytics: Analytics.getAnalytics,
  getWorkouts: Workout.getWorkouts,
  getWorkoutById: Workout.getWorkoutById,
  addUserWorkout: UserWorkout.addUserWorkout,
  // updateUserWorkout: UserWorkout.updateUserWorkout,
  getUserWorkout: UserWorkout.getUserWorkout,
  getPost: Post.getPost,
  addPost: Post.addPost,
  addLike: Post.addLike,
  removeLike: Post.removeLike,
  addComment: Post.addComment,
  getPostById: Post.getPostById,
  deleteById: Post.deleteById
}
