const express = require("express");
const Controller = require("../controllers");

const router = express.Router();

router.get('/', Controller.home);
router.get('/articles', Controller.getArticles);
router.post("/register", Controller.registerUser);
router.post("/login", Controller.loginUser);

module.exports = router;