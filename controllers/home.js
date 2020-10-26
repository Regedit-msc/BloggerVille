const BlogPost = require("../models/BlogPost.js");

module.exports = async (req, res) => {
  let searchOptions = {};
  let searchTest = "i"; //Regexp
  if (req.query.title != null && req.query.title !== "") {
    searchOptions.title = new RegExp(req.query.title, searchTest);
  }
  try {
    const blogposts = await BlogPost.find(searchOptions).populate("userid");
    res.render("index", {
      searchOptions: req.query,
      blogposts: blogposts,
      homePage: true,
    });
  } catch {
    res.redirect("/home");
  }
};
