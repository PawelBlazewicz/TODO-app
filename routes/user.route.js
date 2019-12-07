const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller.js');

router.post('/post', user_controller.user_create);


module.exports = router;