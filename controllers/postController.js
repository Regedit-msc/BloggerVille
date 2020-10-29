/*
	This contains all posts related actions, makes it easier to track since I know where everything is at
*/

// Import dependencies
const BlogPost = require("../models/BlogPost.js");
const path = require("path");

// Displays a single post
const getPost = async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id).populate("userid");
    res.render("post", {
    	blogpost,
    });
};

// Returns home page with all posts
const home = async (req, res) => {
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

// Returns the view to create a new post
const newPost = (req, res) => {

    // Check if the user is logged in
    if (req.session.userId) {
    	return res.render("create", {
      		createPost: true,
    	});
  	}
  	
  	// And if they're not logged in -_-
  	res.redirect("/");
};

// What's the use of all these if we can't just store the posts
const storePost = (req, res) => {
  	let image = req.files.image;
  	image.mv(
    	path.resolve(__dirname, "..", "public/img", image.name),
    	async (error) => {
      		await BlogPost.create({
        		...req.body,
        		image: "/img/" + image.name,
        		userid: req.session.userId,
      		});
      		console.log("req.body", req.body);
      		res.redirect("/home");
    	}
  	);
};

// Export stuff, so they can still work
module.exports = { getPost, home, newPost, storePost };
