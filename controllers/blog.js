const Blog = require("../models/blog");

exports.getMyBlog = (req, res, next) => {
  Blog.find()
  .populate("user")
    .then((result) => {
      if (!result) {
        return res.redirect("/");
      }
      return res.render("blog/my-blog", { title: "My Blog", blog: result });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.getAddPost = (req, res, next) => {
  res.render("blog/add-post", { title: "Add Blog" });
};

exports.postAddPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const isPublic = req.body.public;
  const user = req.session.user;
  console.log("User:", user);

  const blog = new Blog({
    title: title,
    content: content,
    public: isPublic,
    user: user
  });

  blog
    .save()
    .then((result) => {
      console.log("Blog created");
      return res.redirect("/");
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.getBlog = (req, res, next) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      if (!result) {
        return res.redirect("/my-blog");
      }
      return res.render("blog/blog-detail", {
        title: "Blog details",
        blog: result,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};
