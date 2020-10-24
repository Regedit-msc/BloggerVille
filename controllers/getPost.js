const BlogPost = require("../models/BlogPost.js");
module.exports = async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id).populate("userid");
  res.render("post", {
    blogpost, // Find blogpost by id using findById method and req.params,id
    //and render it in post.ejs Note params object will return the id key and value
  });
};
