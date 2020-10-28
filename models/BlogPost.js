const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,

  userid: {
    type: mongoose.Schema.Types.ObjectId, // suppose to be a valid mongodb object id. mongodb has specific ids for each doc and they have to be in a valid format
    ref: "User", // reference User collection
    required: true,
  },
  datePosted: {
    type: Date,
    default: new Date(),
  },
  image: String,
  comments: [
    {
      username: String,
      comment: String,
    },
  ],
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
