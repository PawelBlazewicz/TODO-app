const express = require("express");
    router = express.Router(),
    auth = require("../middlewares/auth"),
    note_controller = require("../controllers/note.controller.js");

router.get("/note/", auth.getTokenCookie, note_controller.getNotes);

router.put("/note/", auth.getTokenCookie, note_controller.addNote);

router.delete("/note/", auth.getTokenCookie,  note_controller.removeNote);

router.patch("/note/", auth.getTokenCookie, note_controller.toggleNote);

module.exports = router;
