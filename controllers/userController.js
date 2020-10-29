// Require User Model

const User = require("../models/User");

// Profile page
const showUser = async (req, res) => {
  // Query for user by request ID
  const userProfile = await User.findOne(req.params.id);

  // Check the ID
  console.log(req.params.id);

  // Render the singleUser Profile page
  res.render("profile", {
    userProfile: userProfile,
  });
};

//Export the showUser function to require in routes/web
module.exports = { showUser };
