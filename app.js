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

mongoose.connect("mongodb+srv://admin_sam:test123@cluster0.l9sjj.mongodb.net/bankdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  balance: Number,
  contact: String
});

const transferSchema = new mongoose.Schema({
  name1: String,
  name2: String,
  balance: Number,
});

const User = new mongoose.model("User", userSchema);
const Transaction = new mongoose.model("Transaction", transferSchema);


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
    contact: "8936478245"
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
  const someconstant7 = new User({
    name: "kabir",
    balance: 1000,
    contact: "9576457788"
  });

  const someconstant9 = new User({
    name: "root",
    balance: 1000,
    contact: "9500486788"
  });
  const someconstant10 = new User({
    name: "alex",
    balance: 1000,
    contact: "9579988788"
  });
  defaultItem = [someconstant1, someconstant2, someconstant3, someconstant4, someconstant5, someconstant6,someconstant7,someconstant9,someconstant10];
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

var username = " ";
app.get("/profile", function(req, res) {
  User.find(function(err, founditems) {
    res.render("profile", {
      profile: founditems,
      profilename: username
    });
  });
});


app.get("/transfer", function(req, res) {
  res.render("transfer");
});

app.get("/transactionhistory", function(req, res) {
  Transaction.find(function(err, founditems) {
    res.render("transactionhistory", {
      transactionhistory: founditems,
    });
  });
});

app.post("/customers", function(req, res) {
  username = req.body.profilebtn;
  res.redirect("/profile");
});

app.post("/transfer", function(req, res) {
  const name1 = req.body.name1;
  const name2 = req.body.name2;
  const amount = req.body.amount;

  const someconst = new Transaction({
    name1: name1,
    name2: name2,
    balance: amount
  });
  someconst.save();
  User.findOne({
    name: name1
  }, function(err, docs) {
    if (err) {
      console.console.log(err);
    } else {
      if (docs !== null) {
        const prevbalance = docs.balance;
        User.findOneAndUpdate({
          name: name1
        }, {
          balance: prevbalance - Number(amount)
        }, null, function(err, docs) {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });

  User.findOne({
    name: name2
  }, function(err, docs) {
    if (err) {
      console.console.log(err);
    } else {
      if (docs !== null) {
        const prevbalance = docs.balance;
        User.findOneAndUpdate({
          name: name2
        }, {
          balance: prevbalance + Number(amount)
        }, null, function(err, docs) {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });
  res.render("complete");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
  console.log("server started");
});
