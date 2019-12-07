const express = require('express'),
      router  = express.Router();

// MAIN SITE
router.get('/', (req, res) => {
    res.render('index');
});

// AUTH ROUTE

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;