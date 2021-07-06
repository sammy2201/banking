//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');



app.get("/", function(req, res) {
  res.send("register");
});



app.listen(3000, function() {
  console.log("in port 3000");
});
