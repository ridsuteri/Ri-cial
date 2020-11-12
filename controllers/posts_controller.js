const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.like = function (req, res) {
    return res.send('<h1><i>Likes of Post!</i></h1>');
}

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created'
            });
        }

        req.flash('success', 'Yay! Post Published')
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        console.log(`Err ${err}`);
        return res.redirect('back');
    }

}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    }, message: "post Deleted"
                });
            }

            req.flash('success', 'Post Deleted')
            return res.redirect('back');
        } else {
            req.flash('error', 'Error Deleting the Post');
            return res.redirect('back');
        }
    } catch (err) {
        // req.flash('error', err);
        console.log(`Err ${err}`);
        return res.redirect('back');
    }

}