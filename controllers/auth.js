const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  let errorMsg = req.flash("error");

  if (errorMsg.length === 0) {
    errorMsg = null;
  }
  res.render("auth/login", { title: "Login", errorMsg: errorMsg });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    req.flash("error", result.array()[0].msg);
    return res.redirect("/login");
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid e-mail or password!");
        return res.redirect("/login");
      }
      return bcrypt
        .compare(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            req.flash("error", "Invalid e-mail or password!");
            return res.redirect("/login");
          }
          req.session.isLoggedIn = true;
          req.session.user = user;
          return res.redirect("/");
        })
        .catch((err) => {
          next(new Error(err));
        });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.getRegister = (req, res, next) => {
  let errorMsg = req.flash("error");

  if (errorMsg.length === 0) {
    errorMsg = null;
  }
  res.render("auth/register", { title: "Register", errorMsg: errorMsg });
};

exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    req.flash("error", result.array()[0].msg);
    return res.redirect("/register");
  }

  User.findOne({ email: email })
    .then((docs) => {
      if (docs) {
        req.flash("error", "E-mail is already in use!");
        return res.redirect("/register");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
          });
          user
            .save()
            .then((dbUser) => {
              console.log("User saved!");
              req.session.isLoggedIn = true;
              req.session.user = dbUser;
              return res.redirect("/");
            })
            .catch((err) => {
              next(new Error(err));
            });
        })
        .catch((err) => {
          next(new Error(err));
        });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.getLogout = (req, res, next) => {
  if (req.session) {
    console.log(req.session);
    req.session.destroy((err) => {
      if (err) {
        console.log("Error logout:");
        console.log(err);
      }
      res.redirect("/");
    });
  }
};
