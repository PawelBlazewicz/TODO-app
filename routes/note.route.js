const express = require('express');
const router = express.Router();

const note_controller = require('../controllers/note.controller.js');


router.get('/GET/:id', note_controller.getNotes);

router.put('/PUT/note/:id/', note_controller.addNote);

router.delete('/DELETE/note/:id/', note_controller.removeNote);

router.patch('/PATCH/note/:id/', note_controller.toggleNote);


module.exports = router;