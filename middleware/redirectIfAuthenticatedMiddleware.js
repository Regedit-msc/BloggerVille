const User = require("../models/User");
module.exports = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/home"); // if user logged in, redirect to home page
  }
  next();
};
