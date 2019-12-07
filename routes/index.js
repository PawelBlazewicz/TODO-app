const express = require('express'),
      router  = express.Router(),
      User    = require('../models/user.model'),
      bcrypt  = require('bcryptjs');

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
                                consile.log(err);
                            });
                    }
                });
            }
        })
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
                    res.send('Auth successful');
                }
            })
    })
        .catch(err =>{
        consile.log(err);
    });
});

module.exports = router;