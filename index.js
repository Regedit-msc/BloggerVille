// Import dependencies
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const routes = require('./routes/web.js'); // All the routes live here now
const expressSession = require("express-session");

// Start the app
const app = new express();

const validateMiddleware = require("./middleware/validateMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const flash = require("connect-flash");

app.use(fileUpload());

mongoose.connect(
  "mongodb+srv://regedit_msc:01cX2mvgZcsv6e56@cluster0.8yeu3.mongodb.net/my_database",
  { useNewUrlParser: true }
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, () => {
  console.log("App listening...");
});

app.use("/posts/store", validateMiddleware);

app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.use(flash());

app.use('/', routes);

app.use((req, res) => res.render("notfound"));
