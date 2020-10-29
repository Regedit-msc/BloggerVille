/*
	Let's put the routes here for ease
*/

// Import dependencies
const express = require('express');
const router = express.Router();

// Import middlewares
const validateMiddleware = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("../middleware/redirectIfAuthenticatedMiddleware");

// Get the controller functions
const { login, newUser, storeUser, loginUser, logout } = require('../controllers/authController');
const { newPost, getPost, storePost, home } = require('../controllers/postController');
const { userComments } = require('../controllers/commentController');

// Login Page
router.get("/", redirectIfAuthenticatedMiddleware, login);

router.get("/posts/new", authMiddleware, newPost);

router.get("/post/:id", getPost);

router.post("/doComment", userComments);

router.post("/posts/store", authMiddleware, storePost);

router.get("/auth/register", redirectIfAuthenticatedMiddleware, newUser);

router.post("/users/register", redirectIfAuthenticatedMiddleware, storeUser);

router.get("/home", home);

router.post("/users/login", redirectIfAuthenticatedMiddleware, loginUser);

router.get("/auth/logout", logout);

module.exports = router;
