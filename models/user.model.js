const mongoose = require('mongoose');
const NoteSchema = require('./note.model');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    pass: {type: String, required: true},
    notes: [NoteSchema]
});



module.exports = mongoose.model('User', UserSchema);