const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller.js');

router.post('/POST', user_controller.user_create);

router.get('/GET/:id', user_controller.user_profile);

//note route
router.put('/PUT/note/:id/', user_controller.add_note);


module.exports = router;