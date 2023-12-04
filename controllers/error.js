exports.get404 = (req, res, next) => {
  res
    .status(404)
    .render("error/404", { title: "Error 404 - Page Not Found", path: null });
};

exports.get500 = (error, req, res, next) => {
  console.log(error);
  res
    .status(500)
    .render("error/500", { title: "Error 500 - Internal Server Error", path: null });
};
