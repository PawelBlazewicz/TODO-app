const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/auth');

const note_controller = require('../controllers/note.controller.js');


router.get('/GET/',middleware.getTokenCookie, note_controller.getNotes);

router.put('/PUT/note/', middleware.getTokenCookie, note_controller.addNote);

router.delete('/DELETE/note/', middleware.getTokenCookie, note_controller.removeNote);

router.patch('/PATCH/note/', middleware.getTokenCookie, note_controller.toggleNote);


module.exports = router;