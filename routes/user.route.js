const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller.js');

router.post('/POST', user_controller.user_create);

router.get('/GET/:id', user_controller.user_profile);

module.exports = router;