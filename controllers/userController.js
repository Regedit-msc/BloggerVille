// Require User Model

const User = require("../models/User");
const Post = require("../models/BlogPost");

// Get Users and send to navbar

const getUser = async (req, res) => {
  // Query the Database for all users

  const users = await User.find({});

  // Send users to navbar

  res.render("profile", { users: users });
};

// User individual details

const showUser = async (req, res) => {
  // Query database for particular user based on id

  const user = await User.findById(req.params.id);
  const posts = await Post.find({ userid: req.params.id });

  // render the user details on the profile page

  res.render("profile", { user, posts });
};

//Export the getUser function to require in routes/web
module.exports = { showUser, getUser };
