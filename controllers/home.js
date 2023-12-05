const Post = require("../models/post");

exports.getHome = (req, res, next) => {
  Post.find({ public: "true" })
    .populate("user")
    .then((result) => {
      res.render("home/home", { title: "BlogMerge", posts: result });
    })
    .catch((err) => {
      next(new Error(err));
    });
};
