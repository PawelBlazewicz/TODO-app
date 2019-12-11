const express    = require('express'),
      router     = express.Router(),
      User       = require('../models/user.model'),
      bcrypt     = require('bcryptjs'),
      jwt        = require('jsonwebtoken'),
      middleware = require('../middlewares/auth');

// MAIN SITE
router.get('/', (req, res) => {
    res.render('index');
});

// AUTH ROUTE
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
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
})

router.get('/loged', middleware.checkToken, (req, res) => {
    res.render('loged');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {
    User.find({name: req.body.username})
        .exec()
        .then(user => {
            if(user.length < 1) {
                res.send('Auth failed');
            }
            bcrypt.compare(req.body.password, user[0].pass, (err, result) => {
                if(err) {
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
                    console.log(user);
                    res.status(200).header('x-auth', token);
                    res.render('loged', {user:user[0]});
                }
            })
    })
        .catch(err =>{
        console.log(err);
    });
});

module.exports = router;