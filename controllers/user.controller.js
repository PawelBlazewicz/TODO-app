const User = require("../models/user.model"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");

exports.logout = function (req, res) {
    res.cookie('token', " ",{
        maxAge: 1000, 
        httpOnly: true, 
    });
    res.redirect('/');
};

exports.register = function (req, res){
    User.find({name: req.body.username})
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.send('User already exists');
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        console.log(err);
                    } else {
                        const newUser = new User({
                            name: req.body.username,
                            pass: hash
                        });
                        console.log(newUser);
                        newUser
                            .save()
                            .then(res.redirect('/login'))
                            .catch(err =>{
                                console.log(err);
                            });
                    }
                });
            }
        })
}

exports.login = function (req, res) {
    User.find({name: req.body.username})
        .exec()
        .then(user => {
            if(user.length < 1) {
                res.send('Auth failed');
            }
            bcrypt.compare(req.body.password, user[0].pass, (err, result) => {
                if(!result) {
                    res.send('Auth failed');
                }
                if(result) {
                    const token = jwt.sign({
                        user: user[0].user,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY || "secretKey",
                    {
                        expiresIn: "1h"
                    });

                    res.cookie('token', token,{
                        maxAge: 1000 * 60 * 60 * 1, // would expire after 1 hour
                        httpOnly: true, // The cookie only accessible by the web server
                    });

                    res.status(200).header('x-auth', token);
                    res.render('loged', {user:user[0]});
                }
            })
    })
        .catch(err =>{
        console.log(err);
    });
}