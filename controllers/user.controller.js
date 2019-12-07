const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const NoteSchema = require('../models/note.model');
const Note = mongoose.model('Note', NoteSchema);


exports.user_create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            pass: req.body.pass,
            notes: req.body.notes
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('New User Created successfully')
    })
};


exports.user_profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.add_note = function (req, res) {
     User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        user.notes.push(new Note({text : req.body.text}) ) 
       
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('New note added successfully')
        })

  
     })   
};