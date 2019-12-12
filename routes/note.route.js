const express = require("express");
    (router = express.Router()),
    (middleware = require("../middlewares/auth")),
    (note_controller = require("../controllers/note.controller.js"));

router.get("/GET/", middleware.getTokenCookie, note_controller.getNotes);

router.put("/PUT/note/", middleware.getTokenCookie, note_controller.addNote);

router.delete("/DELETE/note/", middleware.getTokenCookie,  note_controller.removeNote);

router.patch("/PATCH/note/", middleware.getTokenCookie, note_controller.toggleNote);

module.exports = router;
