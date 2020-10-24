module.exports = (req, res) => {
  if (req.session.userId) {
    return res.render("create", {
      createPost: true,
    }); //if there is a session allow tocreate new post
  }
  res.redirect("/auth/login");
};
