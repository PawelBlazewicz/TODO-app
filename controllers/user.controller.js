const User = require('../models/user.model.js');


exports.user_create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            pass: req.body.pass,
            //notes: req.body.notes
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('New User Created successfully')
    })
};