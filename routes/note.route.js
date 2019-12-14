const express = require("express");
    (router = express.Router()),
    (middleware = require("../middlewares/auth")),
    (note_controller = require("../controllers/note.controller.js"));

router.get("/note/", middleware.getTokenCookie, note_controller.getNotes);

router.put("/note/", middleware.getTokenCookie, note_controller.addNote);

router.delete("/note/", middleware.getTokenCookie,  note_controller.removeNote);

router.patch("/note/", middleware.getTokenCookie, note_controller.toggleNote);

module.exports = router;
