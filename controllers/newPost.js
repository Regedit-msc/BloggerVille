module.exports = (req, res) => {
  // if session contains user id
  if (req.session.userId) {
    return res.render("create", {
      createPost: true,
    });
  }
  // session doesn't contain user id
  res.redirect("/");
};
