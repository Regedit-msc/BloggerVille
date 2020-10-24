const express = require("express");
const app = new express();

const ejs = require("ejs");
// Embedded Javascript Template in views folder.
app.set("view engine", "ejs"); //For fileupload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Middleware for req.body
const bodyParser = require("body-parser");
const newPostController = require("./controllers/newPost"); // newPost.js
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validateMiddleware = require("./middleware/validationMiddleware");
app.use("/posts/store", validateMiddleware);

const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("./controllers/logout");
const expressSession = require("express-session"); // For the cookies
//For flushing away errors from the session on new request
const mongoose = require("mongoose");
// connect to the mongod process and create a Database called my_database.
mongoose.connect(
  "mongodb+srv://regedit_msc:01cX2mvgZcsv6e56@cluster0.8yeu3.mongodb.net/my_database",
  { useNewUrlParser: true }
);
const flash = require("connect-flash");
// Public folder for public asssets.
app.use(express.static("public"));

// reqire BlogPosts.js.
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => {
  console.log("App listening...");
});
global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
/* body-parser parse incoming request bodies
in a middleware and make the form data available under the req.body
property.
Here, we handle a POST request which is generally used to request an
addition to the state of the server unlike GET where we simply get resources.
A user POSTs a blog entry, a photo, signing up for an account, buying an
item etc. POST is used to create records on servers. For modifying existing
records, we use the PUT request. */
app.get("/", homeController);
// Former get method rendering only the index.ejs
// app.get("/", (req, res) => {
//   res.render("index");
// });
app.get("/about", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "pages/about.html"));
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
  //res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, newPostController);
app.use(flash());
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
//res.sendFile(path.resolve(__dirname, "pages/create.html"));

// POST request from form note each form must have a name attribute

// app.post("/posts/store", (req, res) => {
//   // model creates a new doc with browser data
//   BlogPost.create(req.body, (error, blogpost) => {
//     console.log(req.body);
//     res.redirect("/");
//   });
// });
// With async, we specify that the following method is an asynchronous call.
// And using await for BlogPost.create, we are saying that we will await the
// completion of the current line before the below line can be executed. This
// thus lets us have more readable code.

// create a new object in the db from what what the user typed.
// app.post("/posts/store", (req, res) => {
//   let image = req.files.image; // store uploaded image in image variable
//   /* Move the image to the public/img folder for static files(images) */
//   image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
//     await BlogPost.create({
//       ...req.body,
//       image: "/img/" + image.name,
//     }),
//       res.redirect("/");
//   });
// });
app.post("/posts/store", authMiddleware, storePostController);
app.get("/auth/logout", logoutController);
app.use((req, res) => res.render("notfound"));
