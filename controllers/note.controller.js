const User = require('../models/user.model.js');
const mongoose = require('mongoose');
const NoteSchema = require('../models/note.model');
const Note = mongoose.model('Note', NoteSchema);


exports.getNotes = function (req, res) {
    User.findById( req.user.userId, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.addNote = function (req, res) {
     User.findById(req.user.userId, function (err, user) {
        if (err) return next(err);
        user.notes.push(new Note({text : req.body.text, position : req.body.position }) ) 
       
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('New note added successfully')
        })  
     })   
};

exports.removeNote = function (req, res) {
    User.findById(req.user.userId, function (err, user) {
       if (err) return next(err);

       note = user.notes.id(req.body.id)
       if(note) {
            note.remove();  

            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send('Note removed successfully')
            }) 

       } else {
        res.send('Note not found') 
       } 
        
    })   
};

exports.toggleNote = function (req, res) {
    User.findById(req.user.userId, function (err, user) {
       if (err) return next(err);

       note = user.notes.id(req.body.id)
       if(note) {
            note.done = !note.done 

            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send('Note toggled successfully')
            }) 

       } else {
        res.send('Note not found') 
       } 
        
    })   
};
