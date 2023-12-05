const Post = require("../models/post");

exports.getHome = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return Post.find({ public: "true" })
    .populate("user")
    .then((result) => {
      return res.render("home/home-blog", { title: "BlogMerge", posts: result });
    })
    .catch((err) => {
      next(new Error(err));
    });
  }
  return res.render("home/home", { title: "BlogMerge"});
};
