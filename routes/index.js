const express    = require('express'),
      router     = express.Router(),
      user_controller = require("../controllers/user.controller.js");
      auth = require('../middlewares/auth');

// MAIN SITE
router.get('/', (req, res) => {
    res.render('index');
});

// AUTH ROUTE
router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/logout', user_controller.logout);

router.post('/register', user_controller.register);

router.get('/loged', auth.checkToken, (req, res) => {
    res.render('loged');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', user_controller.login);

module.exports = router;