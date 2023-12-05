const express = require('express');

const controller = require('../controllers/blog');

const router = express.Router();

router.get("/add-blog", controller.getAddBlog);

module.exports = router;