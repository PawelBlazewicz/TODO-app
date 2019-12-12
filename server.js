const express = require("express"),
  bodyParser = require("body-parser"),
  user = require("./routes/note.route.js"),
  app = express(),
  mongoose = require("mongoose"),
  cookieParser = require('cookie-parser');
 

app.use(cookieParser())

// ROUTES REQUIRING
const indexRoutes = require("./routes/index");

// DB CONFIG
var dev_db_url =
  "mongodb+srv://someuser:abcd1234@cluster0-wlozt.mongodb.net/test?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// APP CONFIG
app.use(cookieParser())
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
let port = 3041;
app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
