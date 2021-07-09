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

mongoose.connect("mongodb://localhost:27017/bankdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  contact: String
});

const User = new mongoose.model("User", userSchema);



app.get("/", function(req, res) {
  res.render("home");
});

app.get("/customers", function(req, res) {
  const someconstant1 = new User({
    name: "sam",
    balance: 1000,
    contact: "6783458978"
  });
  const someconstant2 = new User({
    name: "bob",
    balance: 1000,
    contact: "6578398435"
  });
  const someconstant3 = new User({
    name: "mille",
    balance: 1000,
    contact: "9724375487"
  });
  const someconstant4 = new User({
    name: "rob",
    balance: 1000,
    contact:"8936478245"
  });
  const someconstant5 = new User({
    name: "john",
    balance: 1000,
    contact: "9785646578"
  });
  const someconstant6 = new User({
    name: "peter",
    balance: 1000,
    contact: "9576486788"
  });
  defaultItem = [someconstant1, someconstant2, someconstant3, someconstant4, someconstant5, someconstant6];
  User.find(function(err, founditems) {
    if (founditems.length === 0) {
      User.insertMany(defaultItem, function(err) {
        if (err) {
          console.log("error");
        } else {
          console.log("done");
        }
      });
    }
    res.render("customers", {
      customers: founditems,
    });
  });
});

var username=" ";
app.get("/profile", function(req, res) {
  User.find(function(err, founditems) {
    res.render("profile", {
      profile: founditems,
      profilename:username
    });
  });
});


app.post("/customers",function(req,res){
  username=req.body.profilebtn;
  res.redirect("/profile");
});

app.listen(3000, function() {
  console.log("in port 3000");
});
