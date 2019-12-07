const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller.js');

router.post('/POST', user_controller.user_create);

router.get('/GET/:id', user_controller.user_profile);

//note routes
router.put('/PUT/note/:id/', user_controller.add_note);

router.delete('/DELETE/note/:id/', user_controller.remove_note);

module.exports = router;