const express    = require('express'),
      bodyParser = require('body-parser'),
      user       = require('./routes/user.route.js'),
      app        = express(),
      mongoose   = require('mongoose');

      var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
          res.send(200);
        }
        else {
          next();
        }
    };

// DB CONFIG
var dev_db_url = 'mongodb+srv://someuser:abcd1234@cluster0-wlozt.mongodb.net/test?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// APP CONFIG 
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/API/users', user);
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

// ROUTES REQUIRING
const indexRoutes = require('./routes/index');

// ROUTES INCLUDING
app.use(indexRoutes);

// SERVER SETUP
let port = 3041;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
})

