const express = require("express");

const controller = require("../controllers/auth");
const validator = require("../utils/validation/auth-validator");
const isAuth = require("../middleware/auth");

const router = express.Router();

router.get("/login", controller.getLogin);
router.get("/register", controller.getRegister);
router.get("/logout", isAuth, controller.getLogout);

router.post("/login", validator.validateLogin(), controller.postLogin);
router.post("/register", validator.validateRegister(), controller.postRegister);

module.exports = router;
