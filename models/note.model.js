const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    text: {type: String, required: true},
    date: { type: Date, default: Date.now },
    done: {type: Boolean , default: false},
    position: { type : Number, enum: [1, 2, 3]}
});


module.exports = NoteSchema;