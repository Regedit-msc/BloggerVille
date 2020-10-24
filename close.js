const express = require("express");
var app = express();

var server = app.listen(4000, function () {
  console.log("Listening :)");
  server.close(function () {
    console.log("Doh :(");
  });
});
