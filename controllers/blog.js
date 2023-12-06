const Post = require("../models/post");

exports.getMyBlog = (req, res, next) => {
  Post.find({ user: req.session.user._id })
    .populate("user")
    .then((result) => {
      if (!result) {
        return res.render("blog/my-blog", { title: "My Blog", posts: [] });
      }
      return res.render("blog/my-blog", { title: "My Blog", posts: result });
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

  const post = new Post({
    title: title,
    content: content,
    public: isPublic,
    user: user,
  });

  post
    .save()
    .then((result) => {
      console.log("Post created");
      return res.redirect("/");
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.getPost = (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
  .populate("user")
    .then((result) => {
      if (!result) {
        return res.redirect("/");
      }
      return res.render("blog/post-detail", {
        title: "Post details",
        post: result,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.getEditPost = (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
  .populate("user")
    .then((result) => {
      if (!result) {
        return res.redirect("/");
      }
      console.log(result.content);
      return res.render("blog/edit-post", {
        title: "Edit post",
        post: result,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};


exports.postEditPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const user = req.session.user;
  const isPublic = req.body.public;
  const id = req.body.id;

  Post.findByIdAndUpdate(id, {title: title, content: content, public: isPublic, user: user._id})
    .then((post) => {
      console.log(post);
      console.log("Post updated");
      return res.redirect("/blog");
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.params.postId)
    .then((result) => {
      res.status(200).json({message: "Success!"});
    })
    .catch((err) => {
      res.status(500).json({message: "Failure!"});
    });
};
