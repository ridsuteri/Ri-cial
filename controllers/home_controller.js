const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, post) {
    //     res.render('home', {
    //         title: 'Ri-cial | Home',
    //         post: post
    //     });
    // });


    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function (err, post) {
        User.find({}, function(err, users){
            res.render('home', {
                title: 'Ri-cial | Home',
                posts:post,
                all_users: users
            });
        });
    });

};