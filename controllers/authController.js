/*
	This contains all authentication related actions
*/

// Get dependencies
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Sends the login view
const login = (req, res) => {
    res.render("login");
};

// Actually log the user in
const loginUser = (req, res) => {

	// Get form data
    const { username, password } = req.body;

    // Check if user exists
  	User.findOne({ username: username }, (error, user) => {
	    if (user) {

	    	// Check if password is correct
	      	bcrypt.compare(password, user.password, (error, same) => {
		        if (same) {
		            req.session.userId = user._id;
		            res.redirect("/home");
		        } else {

		        	// This would be worked on later
		          	res.redirect("/");
		        }
	      	});
	    } else {
	      	res.redirect("/");
	    }
    });
};

// We shouldn't make this, but what choice do we have, users could need to use the toilets :)
const logout = (req, res) => {
  	req.session.destroy(() => {
    	res.redirect("/");
  	});
};

// My favorite part of this all, getting new users
const newUser = (req, res) => {

	// Define the required fields
  	var username = "";
  	var password = "";

  	// Get data from the request object
  	const data = req.flash("data")[0];

  	// Check if data actually is data
  	if (typeof data != "undefined") {

  		// Store the validated data
    	username = data.username;
    	password = data.password;
  	}

  	// Finally does this, lmao
  	res.render("register", {
    	errors: req.flash("validationErrors"),
    	username: username,
    	password: password,
  	});
};

// It'd make a lot of sense if we could store our users too
const storeUser = (req, res) => {

	// Create the new user
  	User.create(req.body, (error, user) => {
    	if (error) {
      		const validationErrors = Object.keys(error.errors).map(
        		(key) => error.errors[key].message
      		);
	      	console.log(validationErrors, "validationErrors");
	      	req.flash("validationErrors", validationErrors);
	      	req.flash("data", req.body);
	      	return res.redirect("/auth/register");
    	}
    
    	res.redirect("/home");
  	});
};

// Export stuff again, I have to do this everytime -_-
module.exports = { login, loginUser, logout, newUser, storeUser };
