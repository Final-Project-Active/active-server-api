const express = require("express");
const Controller = require("../controllers");

const router = express.Router();

router.get('/', Controller.home);
router.get('/articles', Controller.getArticles);

module.exports = router;