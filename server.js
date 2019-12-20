const express = require("express"),
  helmet = require('helmet'),
  bodyParser = require("body-parser"),
  user = require("./routes/note.route.js"),
  app = express(),
  mongoose = require("mongoose"),
  cookieParser = require('cookie-parser');
 

app.use(cookieParser());

// ROUTES REQUIRING
const indexRoutes = require("./routes/index");

// DB CONFIG
var dev_db_url = "";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// APP CONFIG
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", user);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

// ROUTES INCLUDING
app.use(indexRoutes);

// SERVER SETUP
let port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log("Server is up and running on port numner " + port);
});
