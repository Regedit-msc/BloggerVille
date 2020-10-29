/*
	Let's put the routes here for ease
*/

// Import dependencies
const express = require("express");
const router = express.Router();

// Import middlewares
const validateMiddleware = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("../middleware/redirectIfAuthenticatedMiddleware");

// Get the controller functions
const {
  login,
  newUser,
  storeUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const {
  newPost,
  getPost,
  storePost,
  home,
} = require("../controllers/postController");
const { userComments } = require("../controllers/commentController");

// userController
const { showUser } = require("../controllers/userController");

// Login Page
router.get("/", redirectIfAuthenticatedMiddleware, login);

// Create Post
router.get("/posts/new", authMiddleware, newPost);

// Get singlePost Page
router.get("/post/:id", getPost);

// Comment
router.post("/doComment", userComments);

// Save Post
router.post("/posts/store", authMiddleware, storePost);

// Register
router.get("/auth/register", redirectIfAuthenticatedMiddleware, newUser);

// Save newUser
router.post("/users/register", redirectIfAuthenticatedMiddleware, storeUser);

// Home Page
router.get("/home", home);

// Login User
router.post("/users/login", redirectIfAuthenticatedMiddleware, loginUser);

/* Show User Profile Page */
router.get("/user/:id", showUser);

// LogOut
router.get("/auth/logout", logout);

module.exports = router;
