const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.like = function (req, res) {
    return res.send('<h1><i>Likes of Post!</i></h1>');
}

module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Yay! Post Published')
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        console.log(`Err ${err}`);
        return res.redirect('back');
    }

}

module.exports.destroy = async function (req, res) {
    let post = await Post.findById(req.params.id);

    try {
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'Post Deleted')
            return res.redirect('back');
        } else {
            req.flash('error', 'Error Deleting the Post');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        console.log(`Err ${err}`);
        return res.redirect('back');
    }

}