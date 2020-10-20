const Post = require('../models/post');

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, post) {
    //     res.render('home', {
    //         title: 'Ri-cial | Home',
    //         post: post
    //     });
    // });


    Post.find({}).populate('user').exec(function (err, post) {
        res.render('home', {
            title: 'Ri-cial | Home',
            post:post
        });
    });

};