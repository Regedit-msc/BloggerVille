const BlogPost = require("../models/BlogPost.js");
module.exports = function (req, res) {
  let commentName = {
    username: req.body.username,
    comment: req.body.comment,
  };
  BlogPost.findOneAndUpdate(
    { _id: req.body.blogpost_id },
    {
      $push: {
        comments: [commentName],
      },
    },
    { new: true, upsert: true },
    function (error, blogpost) {
      res.send("Your comment has been posted please refresh the page🤲🏽.");
      if (error) {
        console.log(error);
      }
    }
  );
};
