const { body } = require("express-validator");

exports.validateLogin = () => {
  return (
    body("email", "Invalid e-mail or password!").isEmail().notEmpty().escape(),
    body("password", "Invalid e-mail or password!")
      .isLength({ min: 6 })
      .escape()
  );
};

exports.validateRegister = () => {
  return (
    body("username", "Please enter username!").notEmpty().escape(),
    body("email", "Please enter a valid e-mail!").isEmail().notEmpty().escape(),
    body("password", "Password must be at least 6 characters long!")
      .isLength({ min: 6 })
      .escape(),
    body("password", "Passwords do not match!")
      .custom((value, { req }) => {
        return value === req.body.confirmPassword;
      })
      .escape()
  );
};
