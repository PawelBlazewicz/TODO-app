const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user.route.js'); 
const app = express();

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://someuser:abcd1234@cluster0-dydqy.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://someuser:abcd1234@cluster0-wlozt.mongodb.net/test?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/API/users', user);

let port = 3041;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
    
})