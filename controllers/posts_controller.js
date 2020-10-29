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

        return res.redirect('back');
    } catch (err) {
        console.log(`Err ${err}`);
        return;
    }

}

module.exports.destroy = async function (req, res) {
    let post = await Post.findById(req.params.id);

    try {
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(`Err ${err}`);
        return;
    }

}