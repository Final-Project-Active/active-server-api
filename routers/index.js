const express = require("express");
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.get('/', Controller.home);
router.get('/articles', Controller.getArticles);
router.post("/register", Controller.registerUser);
router.post("/login", Controller.loginUser);
router.get("/user", authentication, Controller.findById);
router.post("/analytics", authentication, Controller.createAnalytics);
router.get("/analytics", authentication, Controller.getAnalytics);
router.get("/workout", authentication, Controller.getWorkouts);
router.get("/workout/:workoutId", authentication, Controller.getWorkoutById);
router.post("/userworkout/:workoutId", authentication, Controller.addUserWorkout);
router.put("/userworkout/:workoutId", authentication, Controller.updateUserWorkout);

router.get("/post", authentication, Controller.getPost);
router.post("/post", authentication, Controller.addPost);
router.post("/like", authentication, Controller.addLike);
router.post("/comment", authentication, Controller.addComment);
router.get("/post/:postId", authentication, Controller.getPostById);

module.exports = router;