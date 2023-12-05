const express = require("express");
const controller = require("../controllers/blog");
const isAuth = require("../middleware/auth");

const router = express.Router();

router.get("/", isAuth, controller.getMyBlog);
router.get("/add-post", isAuth, controller.getAddPost);
router.get("/:id", isAuth, controller.getPost);

router.post("/add-post", isAuth, controller.postAddPost);

router.post("/", isAuth, controller.deletePost);

module.exports = router;
