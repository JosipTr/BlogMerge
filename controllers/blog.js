exports.getAddBlog = (req, res, next) => {
    res.render("blog/add-blog", {title: "New Blog"});
}