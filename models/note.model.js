const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    text: {type: String, required: true},
    date: { type: Date, default: Date.now },
    done: {type: Boolean , default: false}
});


//module.exports = mongoose.model('Note', UserSchema);
module.exports = NoteSchema;